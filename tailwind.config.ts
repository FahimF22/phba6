import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#090a0a',
        panel: '#111414',
        panel2: '#171a1a',
        lime: '#ccff00',
        muted: '#9da39e',
        line: '#2a2f2d',
      },
      boxShadow: {
        lime: '0 0 0 1px rgba(204,255,0,.2), 0 16px 50px rgba(0,0,0,.25)',
      },
    },
  },
  plugins: [],
};

export default config;