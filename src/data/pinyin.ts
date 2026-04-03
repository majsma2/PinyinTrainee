/** 声母（小学一年级常用表） */
export const INITIALS = [
  'b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h', 'j', 'q', 'x',
  'zh', 'ch', 'sh', 'r', 'z', 'c', 's', 'y', 'w',
] as const

/** 第一关「韵母 / 混合」使用，不含三拼韵母 */
export const FINALS = [
  'a', 'o', 'e', 'i', 'u', 'ü',
  'ai', 'ei', 'ui', 'ao', 'ou', 'iu', 'ie', 'üe', 'er',
  'an', 'en', 'in', 'un', 'ün', 'ang', 'eng', 'ing', 'ong',
] as const

/** 三拼音节韵母，仅第二关抽题；第一关不出现 */
export const FINALS_SANPIN = [
  'iao', 'ian', 'iang', 'iong', 'uai', 'uan', 'uang',
] as const

/** 第二关韵母选项池 */
export const FINALS_LEVEL2: readonly string[] = [...FINALS, ...FINALS_SANPIN]

export const WHOLE_SYLLABLES = [
  'zhi', 'chi', 'shi', 'ri', 'zi', 'ci', 'si',
  'yi', 'wu', 'yu', 'ye', 'yue', 'yuan', 'yin', 'yun', 'ying',
] as const

export type PracticeMode = 'initial' | 'final' | 'whole' | 'mixed'

export function poolForMode(mode: PracticeMode): readonly string[] {
  switch (mode) {
    case 'initial':
      return INITIALS
    case 'final':
      return FINALS
    case 'whole':
      return WHOLE_SYLLABLES
    case 'mixed': {
      const set = new Set<string>()
      ;[...INITIALS, ...FINALS, ...WHOLE_SYLLABLES].forEach((s) => set.add(s))
      return [...set]
    }
    default:
      return INITIALS
  }
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function pickDistinct(pool: readonly string[], n: number): string[] {
  if (pool.length < n) throw new Error('pool too small')
  return shuffle([...pool]).slice(0, n)
}