import daisyui from "daisyui";
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        techbuddy: {
          primary: "#4f46e5",
          "primary-content": "#ffffff",
          secondary: "#0ea5e9",
          "secondary-content": "#ffffff",
          accent: "#ec4899",
          neutral: "#1e293b",
          "neutral-content": "#f8fafc",
          "base-100": "#ffffff",
          "base-200": "#f1f5f9",
          "base-300": "#e2e8f0",
          "base-content": "#0f172a",
          info: "#0ea5e9",
          success: "#16a34a",
          "success-content": "#ffffff",
          warning: "#f59e0b",
          error: "#dc2626",
          "error-content": "#ffffff",
        },
      },
    ],
  },
};
