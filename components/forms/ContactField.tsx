/**
 * Contact Field Component
 * 
 * Reusable form field with label, input, and error display.
 * Per SRS EC-003: Accessible inline errors with aria attributes.
 */

interface ContactFieldProps {
  id: string;
  label: string;
  type: "text" | "email";
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  rows?: number;
}

export function ContactField({
  id,
  label,
  type,
  value,
  onChange,
  error,
  disabled = false,
  placeholder,
  rows,
}: ContactFieldProps) {
  const InputComponent = type === "email" || type === "text" ? "input" : "textarea";

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-foreground mb-2">
        {label}
      </label>
      <InputComponent
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
        disabled={disabled}
        rows={rows}
        className="w-full px-4 py-3 bg-background border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed resize-vertical"
        placeholder={placeholder}
        required
      />
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
