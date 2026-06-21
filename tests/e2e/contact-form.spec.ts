/**
 * Contact Form E2E Tests
 * 
 * Per 10-testing-strategy.md §3: Critical E2E tests for contact form.
 * Per SRS FR-007: Contact form validation and confirmation.
 * Per SRS SR-003: Contact form abuse protection (rate limiting, spam detection).
 * Per SRS EC-009: Rate limit rejection shows specific message.
 * Per SRS EC-003: Invalid email shows accessible inline error.
 * Per SRS AR-002: Keyboard accessibility.
 */

import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('should render contact page with form', async ({ page }) => {
    await expect(page).toHaveTitle(/Contact - Portfolio/);
    await expect(page.locator('h1')).toContainText('Contact');
    await expect(page.locator('form')).toBeVisible();
  });

  test('should show inline validation error for invalid email', async ({ page }) => {
    const emailInput = page.locator('#email');
    const submitButton = page.locator('button[type="submit"]');

    // Fill with invalid email
    await emailInput.fill('invalid-email');
    await emailInput.blur();

    // Try to submit
    await submitButton.click();

    // Should show inline error
    const emailError = page.locator('#email-error');
    await expect(emailError).toBeVisible();
    await expect(emailError).toContainText('Invalid email address');
    
    // Should have aria-invalid attribute
    await expect(emailInput).toHaveAttribute('aria-invalid', 'true');
  });

  test('should show inline validation error for missing required fields', async ({ page }) => {
    const submitButton = page.locator('button[type="submit"]');

    // Try to submit empty form
    await submitButton.click();

    // Should show validation errors
    await expect(page.locator('#name-error')).toBeVisible();
    await expect(page.locator('#email-error')).toBeVisible();
    await expect(page.locator('#message-error')).toBeVisible();
  });

  test('should show inline validation error for short message', async ({ page }) => {
    const messageInput = page.locator('#message');
    const submitButton = page.locator('button[type="submit"]');

    // Fill with short message
    await messageInput.fill('short');
    await messageInput.blur();

    // Try to submit
    await submitButton.click();

    // Should show inline error
    const messageError = page.locator('#message-error');
    await expect(messageError).toBeVisible();
    await expect(messageError).toContainText('too short');
  });

  test('should clear validation error when user starts typing', async ({ page }) => {
    const emailInput = page.locator('#email');
    const submitButton = page.locator('button[type="submit"]');

    // Fill with invalid email and submit
    await emailInput.fill('invalid-email');
    await submitButton.click();
    await expect(page.locator('#email-error')).toBeVisible();

    // Start typing valid email
    await emailInput.fill('valid@email.com');
    
    // Error should clear
    await expect(page.locator('#email-error')).not.toBeVisible();
  });

  test('should show loading state during submission', async ({ page }) => {
    const nameInput = page.locator('#name');
    const emailInput = page.locator('#email');
    const messageInput = page.locator('#message');
    const submitButton = page.locator('button[type="submit"]');

    // Fill form with valid data
    await nameInput.fill('Test User');
    await emailInput.fill('test@example.com');
    await messageInput.fill('This is a test message that is long enough to pass validation.');

    // Submit form
    await submitButton.click();

    // Should show loading state
    await expect(submitButton).toHaveText('Sending...');
    await expect(submitButton).toBeDisabled();
  });

  test('should show success message after valid submission', async ({ page }) => {
    const nameInput = page.locator('#name');
    const emailInput = page.locator('#email');
    const messageInput = page.locator('#message');
    const submitButton = page.locator('button[type="submit"]');

    // Fill form with valid data
    await nameInput.fill('Test User');
    await emailInput.fill('test@example.com');
    await messageInput.fill('This is a test message that is long enough to pass validation.');

    // Submit form
    await submitButton.click();

    // Should show success message
    await expect(page.locator('text=Message sent successfully')).toBeVisible();
    await expect(page.locator('text=Thank you for reaching out')).toBeVisible();

    // Form should be reset
    await expect(nameInput).toHaveValue('');
    await expect(emailInput).toHaveValue('');
    await expect(messageInput).toHaveValue('');
  });

  test('should allow sending another message after success', async ({ page }) => {
    const nameInput = page.locator('#name');
    const emailInput = page.locator('#email');
    const messageInput = page.locator('#message');
    const submitButton = page.locator('button[type="submit"]');

    // First submission
    await nameInput.fill('Test User');
    await emailInput.fill('test@example.com');
    await messageInput.fill('This is a test message that is long enough to pass validation.');
    await submitButton.click();

    // Wait for success message
    await expect(page.locator('text=Message sent successfully')).toBeVisible();

    // Click "Send another message"
    await page.locator('text=Send another message').click();

    // Form should be reset and ready for new submission
    await expect(nameInput).toHaveValue('');
    await expect(emailInput).toHaveValue('');
    await expect(messageInput).toHaveValue('');
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toHaveText('Send Message');
  });

  test('should be keyboard accessible', async ({ page }) => {
    const nameInput = page.locator('#name');
    const emailInput = page.locator('#email');
    const messageInput = page.locator('#message');
    const submitButton = page.locator('button[type="submit"]');

    // Tab through form fields
    await page.keyboard.press('Tab');
    await expect(nameInput).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(emailInput).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(messageInput).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(submitButton).toBeFocused();

    // Submit with keyboard
    await page.keyboard.press('Enter');
    
    // Should trigger validation (empty form)
    await expect(page.locator('#name-error')).toBeVisible();
  });

  test('should have honeypot field hidden from sighted users', async ({ page }) => {
    const honeypotInput = page.locator('#honeypot');

    // Honeypot should exist but be off-screen
    await expect(honeypotInput).toBeVisible();
    
    // Check if it's positioned off-screen (via computed style)
    const boundingBox = await honeypotInput.boundingBox();
    expect(boundingBox?.x).toBeLessThan(0); // Off-screen to the left
  });

  test('should have proper ARIA attributes for accessibility', async ({ page }) => {
    const emailInput = page.locator('#email');

    // All inputs should have proper labels
    await expect(page.locator('label[for="name"]')).toBeVisible();
    await expect(page.locator('label[for="email"]')).toBeVisible();
    await expect(page.locator('label[for="message"]')).toBeVisible();

    // After validation error, should have aria-invalid
    await emailInput.fill('invalid');
    await page.locator('button[type="submit"]').click();
    
    await expect(emailInput).toHaveAttribute('aria-invalid', 'true');
    await expect(emailInput).toHaveAttribute('aria-describedby', 'email-error');
  });

  test('should not have console errors', async ({ page }) => {
    const errors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    // Navigate and interact with form
    await page.goto('/contact');
    await page.locator('#name').fill('Test User');
    await page.locator('#email').fill('test@example.com');
    await page.locator('#message').fill('This is a test message that is long enough to pass validation.');
    await page.locator('button[type="submit"]').click();

    // Wait a bit for any async errors
    await page.waitForTimeout(1000);

    // Should have no console errors
    expect(errors).toHaveLength(0);
  });

  test('should navigate to other pages from contact page', async ({ page }) => {
    // Test navigation links
    await page.click('text=View Projects');
    await expect(page).toHaveURL('/projects');

    await page.goto('/contact');
    await page.click('text=View Skills');
    await expect(page).toHaveURL('/skills');

    await page.goto('/contact');
    await page.click('text=Download Resume');
    await expect(page).toHaveURL('/resume');
  });
});
