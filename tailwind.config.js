/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-black': 'var(--bg-black)',
        'bg-dark': 'var(--bg-dark)',
        'bg-card': 'var(--bg-card)',
        'bg-elevated': 'var(--bg-elevated)',
        gold: 'var(--gold)',
        'gold-light': 'var(--gold-light)',
        'gold-dark': 'var(--gold-dark)',
        'gold-subtle': 'var(--gold-subtle)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        'border-dark': 'var(--border-dark)',
        'border-gold': 'var(--border-gold)',
      },
      boxShadow: {
        'text-glow': 'var(--text-glow)',
        'text-glow-strong': 'var(--text-glow-strong)',
        'text-glow-subtle': 'var(--text-glow-subtle)',
        'gold-glow': '0 0 25px var(--gold-glow)',
        'gold-subtle': '0 0 20px var(--gold-subtle)',
      },
      animation: {
        'text-glow-pulse': 'textGlowPulse 4s ease-in-out infinite',
        teeter: 'teeter 2s ease-in-out infinite',
        // Add others from your keyframes
      },
      keyframes: {
        textGlowPulse: {
          '0%, 100%': { textShadow: '0 0 20px rgba(102, 252, 241, 0.35), 0 0 40px rgba(102, 252, 241, 0.2)' },
          '50%': { textShadow: '0 0 25px rgba(102, 252, 241, 0.45), 0 0 50px rgba(102, 252, 241, 0.25)' },
        },
        teeter: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '25%': { transform: 'rotate(2deg)' },
          '50%': { transform: 'rotate(-2deg)' },
          '75%': { transform: 'rotate(2deg)' },
        },
        // Add all your other keyframes here (backLightMove1, etc.)
      },
    },
  },
  plugins: [],
}