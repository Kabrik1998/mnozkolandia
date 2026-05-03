export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Nunito', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 18px 40px rgba(34, 74, 110, 0.16)',
        button: '0 10px 0 rgba(15, 70, 90, 0.16)'
      },
      colors: {
        cream: '#fff7df',
        skysoft: '#dff6ff',
        ink: '#17324d',
        tealpop: '#2cc7b8',
        lemon: '#ffd966',
        coral: '#ff8f86',
        lilac: '#b9a7ff'
      }
    }
  },
  plugins: []
};
