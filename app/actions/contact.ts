/**
 * Contact Form Server Action
 * 
 * Per 17-api-contracts.md §7: Contact Form Contracts with all SR-003 layers.
 * Per Security Guidelines §4: All 4 protection layers in correct order.
 * Per AI_CONTEXT.md §5: Server Actions for external I/O, not in components.
 * Per 21-ai-engineering-handbook.md §6: Security constraints enforced.
 */

"use server";

import { contactSchema } from "@/lib/content/schemas";
import { checkRateLimit } from "@/lib/rate-limit/upstash";
import { sendEmail } from "@/services/emailService";
import { headers } from "next/headers";

// Contact form input interface (per 17-api-contracts.md §7)
export interface ContactFormInput {
  name: string;
  email: string;
  message: string;
  honeypot?: string;
}

// Contact action result discriminated union (per 17-api-contracts.md §7)
export type ContactActionResult =
  | { success: true; message: string }
  | { success: false; error: { code: "VALIDATION_ERROR"; field?: string; message: string } }
  | { success: false; error: { code: "RATE_LIMITED"; message: string; retryAfter?: number } }
  | { success: false; error: { code: "EMAIL_SERVICE_ERROR"; message: string } };

/**
 * Submit contact form with full SR-003 protection
 * 
 * Protection layers (in order):
 * 1. Honeypot check (silent drop if filled)
 * 2. Zod validation (client + server)
 * 3. Upstash rate limiting (IP-based)
 * 4. Async email dispatch (fire-and-forget)
 * 
 * @param formData - Contact form data
 * @returns ContactActionResult discriminated union
 * 
 * Per Security Guidelines §4: Never block on email provider response.
 * Per API Contracts §7: Return discriminated union for type safety.
 */
export async function submitContactForm(formData: ContactFormInput): Promise<ContactActionResult> {
  // === LAYER 1: Honeypot Check (Security Guidelines §4.1) ===
  // Silent drop if honeypot is filled (spam detection)
  if (formData.honeypot && formData.honeypot.length > 0) {
    console.log("🚫 Honeypot triggered - silent drop");
    // Return success to avoid tipping off spammers
    return { success: true, message: "Message sent successfully" };
  }

  // === LAYER 2: Zod Validation (Security Guidelines §3) ===
  // Shared schema between client and server
  const validationResult = contactSchema.safeParse(formData);
  
  if (!validationResult.success) {
    const firstError = validationResult.error.issues[0];
    return {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        field: firstError.path[0] as string,
        message: firstError.message,
      },
    };
  }

  const validatedData = validationResult.data;

  // === LAYER 3: Rate Limiting (Security Guidelines §4.2) ===
  // IP-based rate limiting via Upstash Redis
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown";
  
  // Create a unique key combining IP and email for better protection
  const rateLimitKey = `${ip}:${validatedData.email.toLowerCase()}`;
  
  const rateLimitResult = await checkRateLimit(rateLimitKey);
  
  if (!rateLimitResult.success) {
    return {
      success: false,
      error: {
        code: "RATE_LIMITED",
        message: "You've submitted a few messages recently — please try again later",
        retryAfter: rateLimitResult.reset ? Math.ceil((rateLimitResult.reset.getTime() - Date.now()) / 1000) : undefined,
      },
    };
  }

  // === LAYER 4: Async Email Dispatch (Security Guidelines §4.4) ===
  // Fire-and-forget email dispatch - never block on provider response
  try {
    // Sanitize message before sending (Security Guidelines §3)
    const sanitizedMessage = validatedData.message
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/<[^>]*>/g, "");

    // Send email asynchronously (non-blocking)
    const emailPromise = sendEmail({
      to: process.env.CONTACT_EMAIL_TO || "portfolio@example.com",
      from: process.env.RESEND_FROM_EMAIL || "noreply@portfolio.dev",
      subject: `New Contact Form Submission from ${validatedData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${validatedData.name}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${sanitizedMessage}</p>
          </div>
          <p style="color: #666; font-size: 12px;">This message was sent from the portfolio contact form.</p>
        </div>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${validatedData.name}
        Email: ${validatedData.email}
        
        Message:
        ${sanitizedMessage}
        
        ---
        This message was sent from the portfolio contact form.
      `,
    });

    // Fire-and-forget: don't await the email promise
    // Log success/failure asynchronously
    emailPromise
      .then((result) => {
        if (result.success) {
          console.log("✅ Email sent successfully:", result.messageId);
        } else {
          console.error("❌ Email service failed (non-blocking):");
        }
      })
      .catch((error) => {
        console.error("❌ Email service error (non-blocking):", error);
      });

    // Return success immediately (don't wait for email)
    return {
      success: true,
      message: "Thank you for your message! I'll get back to you soon.",
    };
  } catch (error) {
    console.error("❌ Contact form submission error:", error);
    
    // Return generic error to avoid leaking implementation details
    return {
      success: false,
      error: {
        code: "EMAIL_SERVICE_ERROR",
        message: "Unable to send message. Please try again later.",
      },
    };
  }
}
