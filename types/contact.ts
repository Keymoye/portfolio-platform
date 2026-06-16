export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  honeypot: string;            // SR-003: must be empty string
}

export type ContactActionResult =
  | { success: true }
  | { error: 'validation'; fields: Record<string, string[]> }
  | { error: 'rate_limit' }
  | { error: 'server' };
