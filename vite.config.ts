import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
    server:{
      proxy:{
        '/api':
        {
          target:'https://quiix.shop',
          // target:'http://localhost:8000',
          changeOrigin: true, // Matches the Origin header
           secure: true,  
        }
      }
    }
})