module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      animation: {
        bounce0: "bounce 600ms infinite",
        bounce200: "bounce 600ms infinite 200ms",
        bounce400: "bounce 600ms infinite 400ms"
      }
    }
  },
  plugins: []
};
