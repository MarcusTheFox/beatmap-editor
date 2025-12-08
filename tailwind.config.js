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
        'night': { DEFAULT: '#121216', 100: '#040404', 200: '#070709', 300: '#0b0b0d', 400: '#0f0f12', 500: '#121216', 550: '#282830', 600: '#3d3d4a', 700: '#67677e', 800: '#9898ab', 900: '#cbcbd5' },
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
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            h2: {
              borderTop: "1px solid #67677e",
              paddingTop: "1em",
              marginTop: "2em",
            },
            p: {
              lineHeight: 1.5,
            },
            a: {
              fontWeight: 600,
              textDecorationLine: "none",
            },
            li: {
              lineHeight: 1.5,
            },
            strong: {
              fontWeight: 700,
              color: "hsl(var(--heroui-warning) / 1)",
            },
            blockquote: {
              fontWeight: 300,
              borderColor: "hsl(var(--heroui-warning) / 0.7)",
              strong: {
                color: "hsl(var(--heroui-warning) / 1)",
              },
              code: {
                color: "hsl(var(--heroui-warning) / 1)",
              },
            },
            code: {
              background: "hsl(var(--heroui-warning) / 0.1)",
              color: "hsl(var(--heroui-warning) / 1)",
              padding: '0.125rem 0.25rem',
              borderRadius: '0.375rem',
              fontSize: "1rem",
              fontWeight: 500,
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          }
        }
      })
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
            foreground: "#cbcbd5", // night-900 (светлый оттенок для текста)
            primary: {
              DEFAULT: "#2176ff", // blue_crayola
              foreground: "#ffffff", // Белый текст на синих кнопках
            },
            secondary: {
              DEFAULT: "#33a1fd", // celestial_blue
              foreground: "#121216", // Тёмный текст
            },
            warning: {
              DEFAULT: "#fdca40", // sunglow
              foreground: "#121216", // Тёмный текст
            },
            default: { // Для карточек и других поверхностей
              DEFAULT: "#121216", // Основной фон карточки
              100: "#0f0f12",    // Более тёмный оттенок
              200: "#3d3d4a",    // Для границ и разделителей
            },
            content1: "#121216", // Фон карточек
            content2: "#0f0f12"
          },
        }
      }
    }
  )],
}

module.exports = config;