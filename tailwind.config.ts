import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "hsl(var(--background))",
          muted: "hsl(var(--background-muted))",
        },
        foreground: {
          DEFAULT: "hsl(var(--foreground))",
          muted: "hsl(var(--foreground-muted))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
        },
        border: {
          DEFAULT: "hsl(var(--border))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
        },
      },
      fontSize: {
        display: ["2.5rem", { lineHeight: "1.1", fontWeight: "700" }],
        "h1": ["2rem", { lineHeight: "1.2", fontWeight: "600" }],
        "h2": ["1.5rem", { lineHeight: "1.3", fontWeight: "600" }],
        "h3": ["1.25rem", { lineHeight: "1.4", fontWeight: "600" }],
        body: ["1rem", { lineHeight: "1.6", fontWeight: "400" }],
        small: ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }],
      },
      screens: {
        mobile: "<640px",
        tablet: "640px",
        desktop: "1024px",
      },
    },
  },
  plugins: [],
};

export default config;
