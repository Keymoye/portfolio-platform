/**
 * Form Status Component
 * 
 * Displays success or error messages for the contact form.
 */

interface FormStatusProps {
  type: "success" | "error";
  message?: string;
  onReset?: () => void;
}

export function FormStatus({ type, message, onReset }: FormStatusProps) {
  if (type === "success") {
    return (
      <div className="p-4 bg-success/10 border border-success/20 rounded-md">
        <p className="text-sm text-success font-medium mb-2">
          Message sent successfully!
        </p>
        <p className="text-sm text-muted-foreground mb-4">
          Thank you for reaching out. I&apos;ll get back to you soon.
        </p>
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="text-sm text-accent hover:underline"
          >
            Send another message
          </button>
        )}
      </div>
    );
  }

  if (type === "error" && message) {
    return (
      <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-md" role="alert">
        <p className="text-sm text-destructive">{message}</p>
      </div>
    );
  }

  return null;
}
