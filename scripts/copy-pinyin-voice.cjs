/**
 * 将 pinyin-voice 的 mp3 复制到 public/pinyin-voice，供 Vite 静态访问。
 */
const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const src = path.join(root, 'node_modules', 'pinyin-voice', 'voice')
const dest = path.join(root, 'public', 'pinyin-voice')

if (!fs.existsSync(src)) {
  console.warn('[copy-pinyin-voice] 未找到', src, '（请先 npm install）')
  process.exit(0)
}

fs.mkdirSync(path.dirname(dest), { recursive: true })
fs.cpSync(src, dest, { recursive: true })
console.log('[copy-pinyin-voice] 已复制到 public/pinyin-voice')
