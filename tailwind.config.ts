import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#FAFAF8",
        ivory: "var(--color-bg-secondary)",
        cream: "var(--color-bg-tertiary)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-muted": "var(--color-text-muted)",
        cherry: "var(--color-accent-cherry)",
        gold: "var(--color-accent-gold)",
        border: "var(--color-border)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        heading: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-body)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      spacing: {
        "section": "clamp(10rem, 18vw, 12.5rem)",
        "content-x": "clamp(1.5rem, 5vw, 5rem)",
      },
    },
  },
  plugins: [],
} satisfies Config;
