/**
 * 第三关：只比对拼音音节，不要求输入声调（与文件名去掉末尾 1–5 后一致）。
 */

/** 从 voice 文件名得到带声调的完整字符串，如 ma1、jue2 */
export function expectedPinyinFromVoice(voiceFile: string): string {
  return voiceFile.replace(/\.mp3$/i, '').toLowerCase()
}

/** 去掉末尾声调数字（课本常见 1–4，兼容 5） */
export function stripTrailingTone(s: string): string {
  return s.replace(/[1-5]+$/u, '')
}

/**
 * 规范化用户输入：去空格、小写；ü→v；jve/qve/xve→jue 等；再去掉末尾声调（允许误输入声调仍判对）。
 */
export function normalizeUserPinyin(raw: string): string {
  let s = raw.trim().toLowerCase().replace(/\s/g, '')
  s = s.replace(/ü/g, 'v')
  s = s.replace(/([jqx])v([ei])/g, '$1u$2')
  return stripTrailingTone(s)
}

/** 与字库音频对应的「无调」标准答案 */
export function expectedSyllableFromVoice(voiceFile: string): string {
  return stripTrailingTone(expectedPinyinFromVoice(voiceFile))
}

export function matchesPinyinAnswer(userInput: string, voiceFile: string): boolean {
  const exp = expectedSyllableFromVoice(voiceFile)
  return normalizeUserPinyin(userInput) === exp
}

/** 第四关：直接给定无调拼音音节（无音频文件） */
export function matchesPinyinSyllable(userInput: string, expectedSyllable: string): boolean {
  const exp = normalizeUserPinyin(expectedSyllable)
  return normalizeUserPinyin(userInput) === exp
}
