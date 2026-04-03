import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    /** 监听 0.0.0.0，避免部分环境下 localhost 无法访问；终端会显示 Network 地址 */
    host: true,
    port: 5173,
    strictPort: false,
  },
  preview: {
    host: true,
    port: 4173,
    strictPort: false,
  },
})
