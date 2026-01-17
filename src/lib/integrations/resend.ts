import { Resend } from "resend";

// Initialize Resend client
const resendApiKey = process.env.RESEND_API_KEY;
const emailFrom = process.env.EMAIL_FROM || "Campaign <campaign@example.com>";
const candidateName = process.env.NEXT_PUBLIC_CANDIDATE_NAME || "Candidate";
const office = process.env.NEXT_PUBLIC_OFFICE || "Office";
const county = process.env.NEXT_PUBLIC_COUNTY || "County";
const state = process.env.NEXT_PUBLIC_STATE || "State";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const actBlueUrl = process.env.NEXT_PUBLIC_ACTBLUE_URL || "#";

if (!resendApiKey) {
  console.warn("RESEND_API_KEY is not set. Email functionality will be disabled.");
}

const resend = resendApiKey ? new Resend(resendApiKey) : null;

/**
 * Base email sending function with error handling
 */
async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!resend) {
    console.error("Resend client not initialized. Check RESEND_API_KEY.");
    return { success: false, error: "Email service not configured" };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: emailFrom,
      to,
      subject,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Failed to send email:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

/**
 * Welcome email for new signups
 */
export async function sendWelcomeEmail(to: string) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #0033A0; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">Welcome to ${candidateName}'s Campaign!</h1>
        </div>
        
        <div style="background-color: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
          <p style="font-size: 16px; margin-bottom: 20px;">
            Thank you for joining our movement! You're now part of a grassroots campaign 
            fighting for ${county} County families.
          </p>
          
          <p style="font-size: 16px; margin-bottom: 30px;">
            Together, we can build a stronger community and bring real change to ${county} County.
          </p>
          
          <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #0033A0; margin-top: 0;">Get Involved</h2>
            <ul style="list-style: none; padding: 0;">
              <li style="margin-bottom: 15px;">
                <a href="${siteUrl}#volunteer" style="color: #FF6B00; text-decoration: none; font-weight: bold;">
                  → Volunteer with us
                </a>
              </li>
              <li style="margin-bottom: 15px;">
                <a href="${siteUrl}#yard-sign" style="color: #FF6B00; text-decoration: none; font-weight: bold;">
                  → Request a yard sign
                </a>
              </li>
              <li style="margin-bottom: 15px;">
                <a href="${actBlueUrl}" style="color: #FF6B00; text-decoration: none; font-weight: bold;">
                  → Donate to the campaign
                </a>
              </li>
            </ul>
          </div>
          
          <p style="font-size: 14px; color: #6b7280; margin-top: 30px;">
            We'll keep you updated on campaign events, volunteer opportunities, and ways to help.
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 20px; padding: 20px; color: #6b7280; font-size: 12px;">
          <p style="margin: 0;">Paid for by ${candidateName} for ${office}</p>
          <p style="margin: 5px 0 0 0;">
            <a href="${siteUrl}/privacy" style="color: #6b7280;">Privacy Policy</a> | 
            <a href="${siteUrl}/terms" style="color: #6b7280;">Terms</a>
          </p>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to,
    subject: `Welcome to ${candidateName}'s Campaign!`,
    html,
  });
}

/**
 * Volunteer confirmation email
 */
export async function sendVolunteerConfirmation(
  to: string,
  name: string
) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #0033A0; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">Thanks for Volunteering!</h1>
        </div>
        
        <div style="background-color: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
          <p style="font-size: 16px; margin-bottom: 20px;">
            Hi ${name},
          </p>
          
          <p style="font-size: 16px; margin-bottom: 20px;">
            Thank you for signing up to volunteer with our campaign! Your support means everything 
            to us as we work to bring change to ${county} County.
          </p>
          
          <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #0033A0; margin-top: 0;">What's Next?</h2>
            <p style="margin-bottom: 10px;">
              A volunteer coordinator will contact you within the next few days to discuss 
              opportunities that match your interests and availability.
            </p>
            <p style="margin: 0;">
              In the meantime, you can learn more about our campaign at 
              <a href="${siteUrl}" style="color: #FF6B00;">${siteUrl}</a>
            </p>
          </div>
          
          <p style="font-size: 14px; color: #6b7280; margin-top: 30px;">
            We're excited to have you on the team!
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 20px; padding: 20px; color: #6b7280; font-size: 12px;">
          <p style="margin: 0;">Paid for by ${candidateName} for ${office}</p>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to,
    subject: "Thanks for volunteering!",
    html,
  });
}

/**
 * Yard sign confirmation email
 */
export async function sendYardSignConfirmation(
  to: string,
  name: string,
  address: string
) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #FF6B00; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">Yard Sign Request Received</h1>
        </div>
        
        <div style="background-color: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
          <p style="font-size: 16px; margin-bottom: 20px;">
            Hi ${name},
          </p>
          
          <p style="font-size: 16px; margin-bottom: 20px;">
            Thank you for requesting a yard sign! We've received your request and will 
            deliver it to the address below.
          </p>
          
          <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #FF6B00;">
            <p style="margin: 0; font-weight: bold; color: #0033A0;">Delivery Address:</p>
            <p style="margin: 10px 0 0 0; font-size: 16px;">${address}</p>
          </div>
          
          <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #0033A0; margin-top: 0;">Estimated Delivery</h2>
            <p style="margin: 0;">
              We'll deliver your yard sign within <strong>1-2 weeks</strong>. 
              Our team will contact you if we need any additional information.
            </p>
          </div>
          
          <p style="font-size: 14px; color: #6b7280; margin-top: 30px;">
            Thank you for showing your support!
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 20px; padding: 20px; color: #6b7280; font-size: 12px;">
          <p style="margin: 0;">Paid for by ${candidateName} for ${office}</p>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to,
    subject: "Yard Sign Request Received",
    html,
  });
}

/**
 * Contact form confirmation email
 */
export async function sendContactConfirmation(to: string, name: string) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #0033A0; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">We Received Your Message</h1>
        </div>
        
        <div style="background-color: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
          <p style="font-size: 16px; margin-bottom: 20px;">
            Hi ${name},
          </p>
          
          <p style="font-size: 16px; margin-bottom: 20px;">
            Thank you for reaching out! We've received your message and will get back to you 
            as soon as possible.
          </p>
          
          <p style="font-size: 14px; color: #6b7280; margin-top: 30px;">
            In the meantime, you can learn more about our campaign at 
            <a href="${siteUrl}" style="color: #FF6B00;">${siteUrl}</a>
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 20px; padding: 20px; color: #6b7280; font-size: 12px;">
          <p style="margin: 0;">Paid for by ${candidateName} for ${office}</p>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to,
    subject: "We received your message",
    html,
  });
}
