import { NextRequest, NextResponse } from "next/server";
import { volunteerSchema } from "@/lib/validations";
import { createServerClient } from "@/lib/integrations/supabase";
import { sendVolunteerConfirmation } from "@/lib/integrations/resend";
import { signupRateLimit } from "@/lib/integrations/ratelimit";
import { getCorsHeaders } from "@/lib/security/cors";

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
 * POST handler for volunteer signups
 */
export async function POST(request: NextRequest) {
  try {
    const corsHeaders = getCorsHeaders(request);

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
              ...corsHeaders,
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
    
    // Extract optional fields before validation
    const { source, utm_source, utm_medium, utm_campaign, ...formData } = body;
    
    const validationResult = volunteerSchema.safeParse(formData);
    
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400, headers: corsHeaders }
      );
    }

    const {
      first_name,
      last_name,
      email,
      phone,
      zip_code,
      interests,
      availability,
      turnstileToken,
    } = validationResult.data;

    // Verify Turnstile token
    const isTurnstileValid = await verifyTurnstile(turnstileToken, ip);
    
    if (!isTurnstileValid) {
      return NextResponse.json(
        {
          error: "Invalid security verification. Please try again.",
        },
        { status: 400, headers: corsHeaders }
      );
    }

    // Insert/upsert into Supabase
    const supabase = createServerClient();
    
    const { data: volunteerData, error: dbError } = await supabase
      .from("volunteers")
      .upsert(
        {
          email,
          first_name,
          last_name,
          phone: phone || null,
          zip_code: zip_code || null,
          interests: interests && interests.length > 0 ? interests : null,
          availability: availability || null,
          contacted: false,
          source: source || null,
          utm_source: utm_source || null,
          utm_medium: utm_medium || null,
          utm_campaign: utm_campaign || null,
          ip_address: ip !== "unknown" ? ip : null,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "email",
        }
      )
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        {
          error: "Failed to save volunteer signup. Please try again.",
        },
        { status: 500, headers: corsHeaders }
      );
    }

    // Send volunteer confirmation email (don't fail if email fails)
    try {
      await sendVolunteerConfirmation(email, `${first_name} ${last_name}`);
    } catch (emailError) {
      console.error("Failed to send volunteer confirmation email:", emailError);
      // Continue even if email fails - signup was successful
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Volunteer signup successful",
      },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error("Volunteer API error:", error);
    
    return NextResponse.json(
      {
        error: "An unexpected error occurred. Please try again.",
      },
      { status: 500, headers: getCorsHeaders(request) }
    );
  }
}

/**
 * Handle OPTIONS request for CORS
 */
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(request),
  });
}
