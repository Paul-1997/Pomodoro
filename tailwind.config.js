/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        // 为每个字体大小添加 lineHeight 属性
        sm: ['0.875rem', { lineHeight: '1.5' }],
        base: ['1rem', { lineHeight: '1.5' }],
        lg: ['1.125rem', { lineHeight: '1.5' }],
        xl: ['1.25rem', { lineHeight: '1.5' }],
        '2xl': ['1.5rem', { lineHeight: '1.5' }],
        '3xl': ['1.875rem', { lineHeight: '1.5' }],
        '4xl': ['2.25rem', { lineHeight: '1.5' }],
        '5xl': ['3rem', { lineHeight: '1.5' }],
        '6xl': ['3.75rem', { lineHeight: '1.5' }],
        '7xl': ['4.5rem', { lineHeight: '1.5' }],
        '8xl': ['6rem', { lineHeight: '1.5' }],
        '9xl': ['8rem', { lineHeight: '1.5' }],
      },
      colors: {
        primary: '#FF6347', // 番茄色
        secondary: '#FFA500', // 亮橘色
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        'zh-black': ['Noto Sans TC', 'sans-serif'],
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '16/9': '16 / 9',
      },
    },
    container: {
      center: true,
      padding: '0.75rem',
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
};

