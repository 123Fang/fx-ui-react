import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData:
          '@import "./src/styles/index.scss";@import "./src/styles/variable.scss";@import "./src/styles/custom.scss";@import "./src/styles/theme.scss";', // 添加公共样式
      },
    },
  },
})
