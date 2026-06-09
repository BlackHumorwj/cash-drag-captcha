import { defineConfig } from 'vite'
import vue2 from '@vitejs/plugin-vue2'

export default defineConfig({
  root: __dirname,
  plugins: [vue2()],
})
