import { defineConfig } from 'vite'

export default defineConfig({
  /**
   * 使用相对路径，避免部署在子路径（如 GitHub Pages /xxx/repo/）或本地直接打开 dist/index.html 时
   * /assets/... 指向站点根导致 JS/CSS 404、白屏。
   */
  base: './',
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
