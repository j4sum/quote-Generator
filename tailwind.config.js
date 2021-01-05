module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        body: ['Raleway']
      },
      colors: {
        'primary': '#F7DF94',
        'secondary': '#333333',
        'subSecondary': '#828282'
      },
      width: {        
        '5/7': '71.4285714%',
        '6/7': '92.7142857%',
      },
      margin: {
        sm: '4em'
       }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
