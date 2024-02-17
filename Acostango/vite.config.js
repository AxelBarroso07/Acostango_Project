import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.PORT': JSON.stringify(process.env.PORT),
    'process.env.DB_HOST': JSON.stringify(process.env.DB_HOST)
  }
})
