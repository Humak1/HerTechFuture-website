/**
 * Tailwind CSS v4 is a PostCSS plugin. This is the whole configuration --
 * v4 moved theme configuration out of a JS config file and into CSS itself,
 * which is why there is no `tailwind.config.js` in this project.
 * The theme lives in `src/app/globals.css` under `@theme`.
 */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
