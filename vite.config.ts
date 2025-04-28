import Vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'esnext',
  },
  plugins: [
    Vue(),
    svgLoader({
      svgoConfig: {
        multipass: true,
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeViewBox: false,
              },
            },
          },
        ],
      },
    }),
  ],
});
