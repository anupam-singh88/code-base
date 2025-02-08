import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import dotnev from 'dotenv'

// https://vitejs.dev/config/
export default defineConfig({
  // base: "/react-ecommerce",
  plugins: [react()],
  // define: {
  //   //env variable from .env file
  //   'process.env.REACT_APP_AUTH_DOMAIN': JSON.stringify(process.env.REACT_APP_AUTH_DOMAIN)

  // }
})
