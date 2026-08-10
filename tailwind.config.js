import typography from "@tailwindcss/typography"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand purple, already used by the loader and the masonry hover glow.
        accent: "#9A79FF",
      },
      typography: ({ theme }) => ({
        invert: {
          css: {
            "--tw-prose-invert-links": theme("colors.accent"),
            "--tw-prose-invert-quote-borders": theme("colors.accent"),
            "--tw-prose-invert-bullets": theme("colors.accent"),
            "--tw-prose-invert-counters": theme("colors.accent"),
          },
        },
      }),
    },
  },
  plugins: [typography],
}
