/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Edit these six values to re-skin the entire site.
        ivory: '#F7F5F0',
        mist: '#E9EFEA',
        sage: {
          light: '#C7D8D1',
          DEFAULT: '#8EA9A2',
        },
        slate: {
          blue: '#6E8790',
        },
        sand: '#D8C8A8',
        charcoal: '#222726',
      },
      // Tailwind only emits colour/alpha modifiers (e.g. text-charcoal/65) for
      // steps present in this scale, so every 1% step is available.
      opacity: Object.fromEntries(
        Array.from({ length: 101 }, (_, index) => [index, String(index / 100)]),
      ),
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', '"Times New Roman"', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        display: ['clamp(2.75rem, 7vw, 6.5rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        editorial: ['clamp(2rem, 4.4vw, 3.75rem)', { lineHeight: '1.05', letterSpacing: '-0.015em' }],
      },
      letterSpacing: {
        wide2: '0.14em',
      },
      maxWidth: {
        measure: '62ch',
      },
      boxShadow: {
        lift: '0 24px 60px -32px rgba(34, 39, 38, 0.28)',
        card: '0 1px 2px rgba(34, 39, 38, 0.04), 0 18px 40px -30px rgba(34, 39, 38, 0.35)',
      },
      transitionTimingFunction: {
        calm: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
