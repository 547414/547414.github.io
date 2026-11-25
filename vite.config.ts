import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

const srcDir = decodeURIComponent(new URL('./src', import.meta.url).pathname).replace(
  /^\/([A-Za-z]:)/,
  '$1'
)

export default defineConfig({
  base: '/',
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': srcDir
    }
  }
})
