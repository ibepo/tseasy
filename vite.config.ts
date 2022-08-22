/// <reference types="vitest" />

import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import {
  ArcoResolver,
  NaiveUiResolver,
} from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue({
      reactivityTransform: true,
    }),
    Pages(),
    AutoImport({
      imports: [
        'vue',
        'vue/macros',
        'vue-router',
        '@vueuse/core',
        {
          axios: [
            ['default', 'axios'],
          ],
        },
      ],
      dts: true,
    }),
    Components({
      dts: true,
      resolvers: [
        NaiveUiResolver(),
        ArcoResolver(),
      ],
    }),
    Unocss(),
  ],

  test: {
    environment: 'jsdom',
  },
})
