/**
 * Honeypot Field Component
 * 
 * Per Security Guidelines §4.1: Hidden from sighted users but accessible to bots.
 * Off-screen positioning (NOT display:none) to avoid detection.
 */

interface HoneypotFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function HoneypotField({ value, onChange }: HoneypotFieldProps) {
  return (
    <div
      style={{
        position: "absolute",
        left: "-10000px",
        width: "1px",
        height: "1px",
        overflow: "hidden",
      }}
      aria-hidden="true"
      tabIndex={-1}
    >
      <label htmlFor="honeypot">Leave this field blank</label>
      <input
        id="honeypot"
        name="honeypot"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}
