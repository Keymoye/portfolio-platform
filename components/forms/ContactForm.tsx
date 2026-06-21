/**
 * Contact Form Component
 * 
 * Per 18-component-specifications.md: Contact form with full SR-003 protection.
 * Per 11-security-guidelines.md §4: Honeypot with off-screen positioning (not display:none).
 * Per 17-api-contracts.md §7: Uses Server Action with discriminated union.
 * Per 08-design-system.md: Design tokens only, no arbitrary values.
 * Per 09-coding-standards.md: Client Component for interactivity.
 */

"use client";

import { useState, useTransition } from "react";
import { contactSchema } from "@/lib/content/schemas";
import { submitContactForm, type ContactActionResult } from "@/app/actions/contact";
import { HoneypotField } from "./HoneypotField";
import { ContactField } from "./ContactField";
import { FormStatus } from "./FormStatus";

type FormState = "idle" | "submitting" | "success" | "error";

type ValidationError = {
  field: string;
  message: string;
};

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [isPending, startTransition] = useTransition();
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    honeypot: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setValidationErrors((prev) => prev.filter((err) => err.field !== field));
    setServerError(null);
  };

  const validateForm = (): boolean => {
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const errors: ValidationError[] = result.error.issues.map((err) => ({
        field: err.path[0] as string,
        message: err.message,
      }));
      setValidationErrors(errors);
      return false;
    }
    setValidationErrors([]);
    return true;
  };

  const getFieldError = (field: string): string | undefined => {
    return validationErrors.find((err) => err.field === field)?.message;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormState("submitting");
    setServerError(null);

    startTransition(async () => {
      const result: ContactActionResult = await submitContactForm(formData);

      if (result.success) {
        setFormState("success");
        setFormData({ name: "", email: "", message: "", honeypot: "" });
      } else {
        setFormState("error");
        if (result.error.code === "VALIDATION_ERROR") {
          setValidationErrors([{ field: result.error.field || "form", message: result.error.message }]);
        } else {
          setServerError(result.error.message);
        }
      }
    });
  };

  const handleReset = () => {
    setFormState("idle");
    setValidationErrors([]);
    setServerError(null);
  };

  const isDisabled = formState === "submitting" || formState === "success";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <HoneypotField value={formData.honeypot} onChange={(v) => handleInputChange("honeypot", v)} />
      
      <ContactField
        id="name"
        label="Name"
        type="text"
        value={formData.name}
        onChange={(v) => handleInputChange("name", v)}
        error={getFieldError("name")}
        disabled={isDisabled}
        placeholder="Your name"
      />
      
      <ContactField
        id="email"
        label="Email"
        type="email"
        value={formData.email}
        onChange={(v) => handleInputChange("email", v)}
        error={getFieldError("email")}
        disabled={isDisabled}
        placeholder="your.email@example.com"
      />
      
      <ContactField
        id="message"
        label="Message"
        type="text"
        value={formData.message}
        onChange={(v) => handleInputChange("message", v)}
        error={getFieldError("message")}
        disabled={isDisabled}
        placeholder="Your message..."
        rows={6}
      />

      {serverError && <FormStatus type="error" message={serverError} />}

      {formState === "idle" || formState === "error" ? (
        <button
          type="submit"
          disabled={isPending}
          className="w-full px-6 py-3 bg-accent text-background rounded-md font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Sending..." : "Send Message"}
        </button>
      ) : formState === "success" ? (
        <FormStatus type="success" onReset={handleReset} />
      ) : null}
    </form>
  );
}
