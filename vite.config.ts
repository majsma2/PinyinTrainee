import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    /** 监听 0.0.0.0，避免部分环境下 localhost 无法访问；终端会显示 Network 地址 */
    host: true,
    port: 5173,
    strictPort: false,
    /** 用域名访问本机 dev 时允许该 Host，否则 Vite 会返回 “Blocked request” */
    allowedHosts: true,
  },
  preview: {
    host: true,
    port: 4173,
    strictPort: false,
  },
})
