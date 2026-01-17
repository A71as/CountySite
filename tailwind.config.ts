import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx}",
    "./src/lib/**/*.{js,ts,jsx,tsx}",
    "./src/types/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          50: "#E6EDFF",
          100: "#CCDBFF",
          200: "#99B7FF",
          300: "#6693FF",
          400: "#336FFF",
          500: "#0033A0",
          600: "#002980",
          700: "#001F60",
          800: "#001440",
          900: "#000A20",
        },
        accent: {
          50: "#FFF4E6",
          100: "#FFE9CC",
          200: "#FFD399",
          300: "#FFBD66",
          400: "#FFA733",
          500: "#FF6B00",
          600: "#CC5600",
          700: "#994000",
          800: "#662B00",
          900: "#331500",
        },
        // Retro-modern color additions
        retro: {
          red: "#DC2626", // Bold red for emphasis
          yellow: "#FBBF24", // Warm yellow accent
          teal: "#14B8A6", // Retro teal
          purple: "#7C3AED", // Deep purple
        },
        navy: "#001F54",
        cream: "#F9FAFB",
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"], // Bebas Neue for large headings
        heading: ["var(--font-heading)", "system-ui", "sans-serif"], // Space Grotesk for section headings
        body: ["var(--font-body)", "system-ui", "sans-serif"], // Inter for body text
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "retro-shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-in-out",
        "slide-up": "slide-up 0.5s ease-out",
        "pulse-slow": "pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "retro-shimmer": "retro-shimmer 3s linear infinite",
        "float": "float 3s ease-in-out infinite",
      },
      backgroundImage: {
        "retro-gradient": "linear-gradient(135deg, #0033A0 0%, #FF6B00 50%, #DC2626 100%)",
        "retro-diagonal": "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,51,160,0.05) 10px, rgba(0,51,160,0.05) 20px)",
      },
    },
  },
  plugins: [],
};
export default config;
