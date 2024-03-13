import sveltePreprocess from 'svelte-preprocess';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import adapter from '@sveltejs/adapter-static';

const production = process.env.NODE_ENV === 'production';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
        pages: 'build',
        assets: 'build',
        fallback: 'index.html'
    }),
},
  preprocess: sveltePreprocess({
    sourceMap: !production, typescript: { transpileOnly: true },
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
      ],
    },
  }),
  // rest of the config
}

export default config;