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
            light: 'rgb(var(--backgroundLight)/<alpha-value>)',
            instituicao: 'rgb(var(--background-instituicao)/<alpha-value>)',
        },
        red :{
            DEFAULT: 'rgb(var(--red)/<alpha-value>)',
            light: 'rgb(var(--redLight)/<alpha-value>)',
        },
        green: {
            DEFAULT: 'rgb(var(--green)/<alpha-value>)',
            light: 'rgb(var(--greenLight)/<alpha-value>)',
            transition: 'rgb(var(--greenTransition)/<alpha-value>)',
        },
        yellow: {
            DEFAULT: 'rgb(var(--yellow)/<alpha-value>)',
            light: 'rgb(var(--yellowLight)/<alpha-value>)',
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