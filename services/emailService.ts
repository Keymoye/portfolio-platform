/**
 * Email Service Implementation
 * 
 * Per 17-api-contracts.md §8: Abstract email sending (resend, nodemailer, etc.). Non-blocking.
 * Per Security Guidelines §4: Failures logged but do not block user success path.
 * Per System Architecture §4: External I/O lives in services/ layer.
 */

import { Resend } from 'resend';

// Email payload interface (per 17-api-contracts.md §8)
export interface EmailPayload {
  to: string;
  from: string;
  subject: string;
  html: string;
  text?: string;
}

// Email service interface (per 17-api-contracts.md §8)
export interface EmailService {
  send(payload: EmailPayload): Promise<{ success: boolean; messageId?: string }>;
}

// Email service error type (per 17-api-contracts.md §8)
export interface EmailServiceError {
  code: 'EMAIL_SERVICE_ERROR';
  message: string;
  retryable?: boolean;
}

/**
 * Concrete email service implementation using Resend
 * 
 * This service is designed to be called asynchronously from Server Actions.
 * Failures are logged but do not block the user success path (fire-and-forget).
 * 
 * Environment variables required:
 * - RESEND_API_KEY: Resend API key for authentication
 * - RESEND_FROM_EMAIL: Default from email address
 */
class ResendEmailService implements EmailService {
  private resend: Resend;
  private fromEmail: string;

  constructor() {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn('⚠️  RESEND_API_KEY not set - email service will fail gracefully');
    }
    
    this.resend = new Resend(apiKey || '');
    this.fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@portfolio.dev';
  }

  async send(payload: EmailPayload): Promise<{ success: boolean; messageId?: string }> {
    try {
      if (!process.env.RESEND_API_KEY) {
        console.warn('⚠️  Email service skipped: RESEND_API_KEY not configured');
        return { success: false };
      }

      const result = await this.resend.emails.send({
        from: payload.from || this.fromEmail,
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
        text: payload.text,
      });

      if (result.error) {
        console.error('❌ Email service error:', result.error);
        return { success: false };
      }

      console.log('✅ Email sent successfully:', result.data?.id);
      return { success: true, messageId: result.data?.id };
    } catch (error) {
      console.error('❌ Email service unexpected error:', error);
      // Per Security Guidelines §4: Failures logged but do not block user success path
      return { success: false };
    }
  }
}

// Singleton instance
const emailService = new ResendEmailService();

/**
 * Send email using the configured email service
 * 
 * This is the primary export for use in Server Actions.
 * It is designed to be called asynchronously (fire-and-forget).
 * 
 * @param payload - Email payload with to, from, subject, html, and optional text
 * @returns Promise with success status and optional message ID
 * 
 * Example usage in Server Action:
 * ```ts
 * const emailResult = await sendEmail({
 *   to: 'recipient@example.com',
 *   from: 'noreply@portfolio.dev',
 *   subject: 'New contact form submission',
 *   html: '<p>Message content...</p>',
 * });
 * ```
 */
export async function sendEmail(payload: EmailPayload): Promise<{ success: boolean; messageId?: string }> {
  return emailService.send(payload);
}
