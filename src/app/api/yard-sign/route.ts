import { NextRequest, NextResponse } from "next/server";
import { yardSignSchema } from "@/lib/validations";
import { createServerClient } from "@/lib/integrations/supabase";
import { sendYardSignConfirmation } from "@/lib/integrations/resend";
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
 * POST handler for yard sign requests
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
    
    const validationResult = yardSignSchema.safeParse(body);
    
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
      address_line1,
      address_line2,
      city,
      state,
      zip_code,
      quantity,
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

    // Build full address string for email
    const fullAddress = [
      address_line1,
      address_line2,
      `${city}, ${state} ${zip_code}`,
    ]
      .filter(Boolean)
      .join(", ");

    // Insert into Supabase
    const supabase = createServerClient();
    
    const { data: yardSignData, error: dbError } = await supabase
      .from("yard_sign_requests")
      .insert({
        first_name,
        last_name,
        email,
        phone: phone || null,
        address_line1,
        address_line2: address_line2 || null,
        city,
        state,
        zip_code,
        quantity,
        fulfilled: false,
        ip_address: ip !== "unknown" ? ip : null,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        {
          error: "Failed to save yard sign request. Please try again.",
        },
        { status: 500, headers: corsHeaders }
      );
    }

    // Send yard sign confirmation email (don't fail if email fails)
    try {
      await sendYardSignConfirmation(
        email,
        `${first_name} ${last_name}`,
        fullAddress
      );
    } catch (emailError) {
      console.error("Failed to send yard sign confirmation email:", emailError);
      // Continue even if email fails - request was successful
    }

    // Return success response with estimated delivery message
    return NextResponse.json(
      {
        success: true,
        message: "Yard sign request received",
        estimatedDelivery: "1-2 weeks",
      },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error("Yard sign API error:", error);
    
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
