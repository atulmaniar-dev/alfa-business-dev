const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    "autoprefixer": {},
    "cssnano": process.env.NODE_ENV === 'production' ? {} : false,
  },
};

export default config;