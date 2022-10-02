/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        roboto: "'Roboto', sans-serif"
      },
      maxWidth:{
        '1440':"1440px"
      },
      width:{
        '1440':"90rem",
        '1280':"1280px"
      },
      boxShadow:{
        'header': '0px 10px 63px rgba(0, 0, 0, 0.07)'
      },
      colors: {
        'main-green':'#A8B64F',
        'hover-green': '#899441',
        'main-red': '#DC3E22',
        'hover-red':'#EE735D',
        'unactive-red':'#EA8979',
        'text-hover-red':'#B7280F',
        'gray-C4':'#C4C4C4',
        'gray-F4':'#F4F4F4',
        'gray-99':'#999999',
      }
    },
  },
  plugins: [],
}
