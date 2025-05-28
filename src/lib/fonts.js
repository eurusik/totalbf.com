import { Inter, Roboto, Bebas_Neue } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
});

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-roboto',
});

export const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bebas-neue',
});

export const fontVariables = {
  segoeUI: `'Segoe UI', var(--font-roboto), var(--font-inter), -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif`,
  segoeUILight: `'Segoe UI Light', 'Segoe UI', var(--font-roboto), var(--font-inter), -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif`,
  bebasNeue: `'Bebas Neue', var(--font-bebas-neue), cursive`,
};
