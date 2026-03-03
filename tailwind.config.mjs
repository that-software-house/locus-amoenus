/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        border: 'rgba(236, 243, 255, 0.16)',
        input: 'rgba(236, 243, 255, 0.16)',
        ring: 'rgba(83, 214, 224, 0.45)',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: 'hsl(var(--card))',
        'card-foreground': 'hsl(var(--card-foreground))',
        muted: {
          foreground: 'hsl(var(--muted-foreground))'
        }
      },
      keyframes: {
        spotlight: {
          '0%': { opacity: '0', transform: 'translate(-72%, -62%) scale(0.5)' },
          '100%': { opacity: '1', transform: 'translate(-50%, -40%) scale(1)' }
        }
      },
      animation: {
        spotlight: 'spotlight 2.2s ease 0.25s 1 forwards'
      }
    }
  },
  plugins: []
};
