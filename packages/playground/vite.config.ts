import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import TinyUnocssVitePlugin from 'tiny-unocss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [TinyUnocssVitePlugin(), react()],
})
