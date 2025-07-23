/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E9F2FF',
          100: '#C6DBFF',
          200: '#94BBFF',
          300: '#5C97FF',
          400: '#2973FF',
          500: '#1A73E8', // primary blue
          600: '#1559B7',
          700: '#0D3E82',
          800: '#072657',
          900: '#031326',
        },
        secondary: {
          50: '#E6F7F7',
          100: '#C1ECEB',
          200: '#8ADBDA',
          300: '#53CAC8',
          400: '#2EBFBD',
          500: '#20B2AA', // soft teal
          600: '#188E87',
          700: '#116A64',
          800: '#094741',
          900: '#04221F',
        },
        accent: {
          50: '#FFE6F3',
          100: '#FFBDE0',
          200: '#FF94CD',
          300: '#FF6BB9',
          400: '#FF69B4', // accent pink
          500: '#FF3D9A',
          600: '#FF0F7B',
          700: '#DB0064',
          800: '#A3004B',
          900: '#6B0032',
        },
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        success: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          500: '#10B981',
          700: '#047857',
        },
        warning: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          500: '#F59E0B',
          700: '#B45309',
        },
        error: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          500: '#EF4444',
          700: '#B91C1C',
        },
      },
      fontFamily: {
        sans: ['Open Sans', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};