import { heroui } from "@heroui/theme";
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        'night': { DEFAULT: '#121616', 100: '#040404', 200: '#070909', 300: '#0b0d0d', 400: '#0f1212', 500: '#121616', 600: '#3d4a4a', 700: '#677e7e', 800: '#98abab', 900: '#cbd5d5' },
        'blue_crayola': { DEFAULT: '#2176ff', 100: '#001639', 200: '#002c72', 300: '#0042ab', 400: '#0058e4', 500: '#2176ff', 600: '#4b90ff', 700: '#78acff', 800: '#a5c8ff', 900: '#d2e3ff' },
        'celestial_blue': { DEFAULT: '#33a1fd', 100: '#01223d', 200: '#014379', 300: '#0265b6', 400: '#0286f2', 500: '#33a1fd', 600: '#5db5fd', 700: '#86c8fe', 800: '#aedafe', 900: '#d7edff' },
        'sunglow': { DEFAULT: '#fdca40', 100: '#3f2e01', 200: '#7d5c01', 300: '#bc8a02', 400: '#fab803', 500: '#fdca40', 600: '#fdd566', 700: '#fedf8c', 800: '#feeab2', 900: '#fff4d9' },
        'carrot_orange': { DEFAULT: '#f79824', 100: '#361f02', 200: '#6c3d04', 300: '#a25c06', 400: '#d97b08', 500: '#f79824', 600: '#f9ac4e', 700: '#fac17a', 800: '#fcd5a6', 900: '#fdead3' }
      },
      animation: {
        'height-wave': 'height-wave 1s ease-in-out infinite',
      },
      keyframes: {
        'height-wave': {
          '0%, 100%': { 
            transform: 'scaleY(0.2)',
          },
          '50%': { 
            transform: 'scaleY(1)',
          },
        }
      }
    },
  },
  darkMode: "class",
  plugins: [
    typography(),
    heroui({
      themes: {
        dark: {
          colors: {
            background: "#040404", // night
            foreground: "#cbd5d5", // night-900 (светлый оттенок для текста)
            primary: {
              DEFAULT: "#2176ff", // blue_crayola
              foreground: "#ffffff", // Белый текст на синих кнопках
            },
            secondary: {
              DEFAULT: "#33a1fd", // celestial_blue
              foreground: "#121616", // Тёмный текст
            },
            warning: {
              DEFAULT: "#fdca40", // sunglow
              foreground: "#121616", // Тёмный текст
            },
            default: { // Для карточек и других поверхностей
              DEFAULT: "#121616", // Основной фон карточки
              100: "#0f1212",    // Более тёмный оттенок
              200: "#3d4a4a",    // Для границ и разделителей
            },
            content1: "#121616", // Фон карточек
            content2: "#0f1212"
          },
        }
      }
    }
  )],
}

module.exports = config;