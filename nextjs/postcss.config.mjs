/** @type {import('postcss').Postcss} */
const config = {
  plugins: [
    "@tailwindcss/postcss",
    'autoprefixer', // 文字列で指定
    ...(process.env.NODE_ENV === 'production' ? ['cssnano'] : []), // 文字列で指定
  ],
};

export default config;