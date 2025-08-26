import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ضبط base حسب بيئة النشر
export default defineConfig({
  plugins: [react()],
  base: process.env.DEPLOY_ENV === 'GH' ? '/wady/' : '/',
})
