import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { createServerClient } from "@/lib/integrations/supabase";
import { sendContactConfirmation } from "@/lib/integrations/resend";
import { signupRateLimit } from "@/lib/integrations/ratelimit";

/**
 * Get client IP address from request headers
 */
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  
  if (forwarded) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwarded.split(",")[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  return "unknown";
}

/**
 * Verify Turnstile token with Cloudflare
 */
async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  
  if (!secretKey) {
    console.error("TURNSTILE_SECRET_KEY is not set");
    return false;
  }

  try {
    const formData = new FormData();
    formData.append("secret", secretKey);
    formData.append("response", token);
    if (ip && ip !== "unknown") {
      formData.append("remoteip", ip);
    }

    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      console.error("Turnstile verification request failed:", response.statusText);
      return false;
    }

    const data = (await response.json()) as { success: boolean };
    return data.success === true;
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return false;
  }
}

/**
 * Send notification email to campaign team
 */
async function sendContactNotification(
  fromName: string,
  fromEmail: string,
  subject: string | undefined,
  message: string
) {
  const emailFrom = process.env.EMAIL_FROM || "Campaign <campaign@example.com>";
  const resendApiKey = process.env.RESEND_API_KEY;
  
  if (!resendApiKey) {
    console.warn("RESEND_API_KEY not set, skipping contact notification email");
    return { success: false, error: "Email service not configured" };
  }

  const { Resend } = await import("resend");
  const resend = new Resend(resendApiKey);

  const emailSubject = subject
    ? `New Contact Form: ${subject}`
    : "New Contact Form Submission";

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #E92128; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
        </div>
        
        <div style="background-color: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
          <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 0 0 10px 0;"><strong>From:</strong> ${fromName} (${fromEmail})</p>
            ${subject ? `<p style="margin: 0 0 10px 0;"><strong>Subject:</strong> ${subject}</p>` : ""}
          </div>
          
          <div style="background-color: white; padding: 20px; border-radius: 8px; border-left: 4px solid #E92128;">
            <p style="margin: 0 0 10px 0; font-weight: bold; color: #111827;">Message:</p>
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          
          <p style="font-size: 14px; color: #6b7280; margin-top: 20px;">
            Reply directly to: <a href="mailto:${fromEmail}" style="color: #E92128;">${fromEmail}</a>
          </p>
        </div>
      </body>
    </html>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: emailFrom,
      to: emailFrom, // Send to campaign email
      subject: emailSubject,
      html,
      replyTo: fromEmail, // Set reply-to so replies go to the sender
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Failed to send contact notification email:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

/**
 * POST handler for contact form submissions
 */
export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = getClientIP(request);

    // Rate limiting check
    if (signupRateLimit) {
      const { success, limit, reset, remaining } = await signupRateLimit.limit(ip);
      
      if (!success) {
        return NextResponse.json(
          {
            error: "Too many requests. Please try again later.",
          },
          {
            status: 429,
            headers: {
              "X-RateLimit-Limit": limit.toString(),
              "X-RateLimit-Remaining": remaining.toString(),
              "X-RateLimit-Reset": reset.toString(),
            },
          }
        );
      }
    }

    // Parse and validate request body
    const body = await request.json().catch(() => ({}));
    
    const validationResult = contactSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, subject, message, turnstileToken } = validationResult.data;

    // Verify Turnstile token
    const isTurnstileValid = await verifyTurnstile(turnstileToken, ip);
    
    if (!isTurnstileValid) {
      return NextResponse.json(
        {
          error: "Invalid security verification. Please try again.",
        },
        { status: 400 }
      );
    }

    // Insert into Supabase
    const supabase = createServerClient();
    
    const { data: contactData, error: dbError } = await supabase
      .from("contact_submissions")
      .insert({
        name,
        email,
        subject: subject || null,
        message,
        responded: false,
        ip_address: ip !== "unknown" ? ip : null,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        {
          error: "Failed to save contact submission. Please try again.",
        },
        { status: 500 }
      );
    }

    // Send auto-reply to sender (don't fail if email fails)
    try {
      await sendContactConfirmation(email, name);
    } catch (emailError) {
      console.error("Failed to send contact confirmation email:", emailError);
      // Continue even if email fails - submission was successful
    }

    // Send notification to campaign email (don't fail if email fails)
    try {
      await sendContactNotification(name, email, subject, message);
    } catch (notificationError) {
      console.error("Failed to send contact notification email:", notificationError);
      // Continue even if email fails - submission was successful
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully",
      },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    
    return NextResponse.json(
      {
        error: "An unexpected error occurred. Please try again.",
      },
      { status: 500 }
    );
  }
}

/**
 * Handle OPTIONS request for CORS
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
