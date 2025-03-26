import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import jsconfigPaths from 'vite-jsconfig-paths'
import path from "path";
import * as dotenv from 'dotenv'

dotenv.config()


// https://vite.dev/config/
export default defineConfig({
  define: {
    'process.env.SERVER_URL': JSON.stringify(process.env.SERVER_URL),
    'process.env.DEV_SERVER_URL': JSON.stringify(process.env.DEV_SERVER_URL),
  },
  plugins: [react(), tailwindcss(), jsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
