import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  base: './',
  plugins: [vue(), tailwindcss(), vueDevTools(), viteSingleFile()],
  build: {
    assetsInlineLimit: 100000000, // 把图片、字体等资源内联进 HTML
    cssCodeSplit: false, // 把所有 CSS 合并成一个内联块
    // ✅ 不要加 manualChunks
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
