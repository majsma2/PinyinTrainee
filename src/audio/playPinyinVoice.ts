import { tokenToVoiceFilename } from './pinyinVoiceMap.ts'

let current: HTMLAudioElement | null = null

export function cancelPinyinVoice(): void {
  if (!current) return
  current.pause()
  current.currentTime = 0
  current = null
}

function playUrl(url: string): void {
  cancelPinyinVoice()
  const audio = new Audio(url)
  current = audio
  audio.play().catch((err) => {
    console.warn('[playPinyinVoice] 播放失败', url, err)
  })
}

/**
 * 直接播放 pinyin-voice 文件名（如 ma1.mp3），用于完整音节。
 */
export function playVoiceFile(filename: string): void {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, '/')
  playUrl(`${base}pinyin-voice/${filename}`)
}

/**
 * 播放练习项映射（第一关：声母/韵母/整体认读 token）。
 */
export function playPinyinToken(token: string): void {
  const file = tokenToVoiceFilename(token)
  if (!file) {
    console.warn('[playPinyinVoice] 无音频映射:', token)
    return
  }
  playVoiceFile(file)
}
