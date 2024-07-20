import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import type { UserConfig } from 'vite'
import Pages from 'vite-plugin-pages'
import svgLoader from 'vite-svg-loader'

const config: UserConfig = {
  build: {
    target: 'esnext'
  },
  plugins: [
    Vue({
      include: [/\.vue$/],
    }),
    Pages({
      extensions: ['vue'],
      extendRoute: (route) => {
        if (route.path === '/') return { ...route, redirect: '/games' }
        return route
      },
    }),
    Components({
      extensions: ['vue'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/],
    }),
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
    })
  ],
  ssgOptions: {
    script: 'async',
    formatting: 'prettify',
  },
}

export default config
