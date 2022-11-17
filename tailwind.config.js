/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./estruturas/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        normal: "74rem"
      },
      colors: {
        background: {
            DEFAULT: 'rgb(var(--background)/<alpha-value>)',
            light: 'rgb(var(--background-light)/<alpha-value>)',
            instituicao: 'rgb(var(--background-instituicao)/<alpha-value>)',
        },
        red :{
            DEFAULT: 'rgb(var(--red)/<alpha-value>)',
            light: 'rgb(var(--redlight)/<alpha-value>)',
        },
        green: {
            DEFAULT: 'rgb(var(--green)/<alpha-value>)',
            light: 'rgb(var(--greenlight)/<alpha-value>)',
            transition: 'rgb(var(--greenTransition)/<alpha-value>)',
        },
        yeallow: {
            DEFAULT: 'rgb(var(--yeallow)/<alpha-value>)',
            light: 'rgb(var(--yeallowlight)/<alpha-value>)',
        },
        'cinza-fonte-table': 'rgb(var(--cinza-fonte)/<alpha-value>)',
        'verde-padrao': '#035630',
        'botao-baixar': '#fcb94e',
        'cinza-claro': '#455A64',
        'cinza-fonte':'#DADBDB',
              },
      fontFamily: {
        'display': ['Changa One'],
        'sans': ['Poppins', 'sans'],
      },
      borderRadius: {
        'input': '10px',
      },
      fontSize: {
        'xxs': '0.675rem',
      }
    },
  },
  plugins: [],
}