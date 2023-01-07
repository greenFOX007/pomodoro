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
        '1280':"1280px",
        '23per':'23%',
        '74per':'74%',
        '31per':'31.6%',
        '77px':'77px',
        '88per':'88.5%'
      },
      height:{
        '83':"83px",
        '85':"85px",
        '420':"420px"
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
        'gray-DE':'#DEDEDE',
        'gray-EC':'#ECECEC',
        'main-black':"rgba(51, 51, 51, .2)"
      },
      fontSize:{
        '150px':'150px'
      },
      lineHeight:{
        '180px':'180px'
      },
      rotate:{
        '135':'135deg'
      },
      filter:{
        'custom':'drop-shadow(0px 10px 63px rgba(0, 0, 0, 0.07))'
      },
      backgroundImage:{
        'focusimg':"url('../src/img/focus.png')",
        'pauseimg':"url('../src/img/pause.png')",
        'stopsimg':"url('../src/img/stops.png')"
      }
    },
  },
  plugins: [],
}
