import { INITIALS, FINALS_LEVEL2 } from '../data/pinyin.ts'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** 从池中取 3 个错误项 + 正确项，打乱，保证含正确且共 4 个 */
export function pickFourWithCorrect(
  pool: readonly string[],
  correct: string,
): string[] {
  const wrongPool = pool.filter((x) => x !== correct)
  if (wrongPool.length < 3) {
    throw new Error('pool too small for distractors')
  }
  const wrong = shuffle([...wrongPool]).slice(0, 3)
  return shuffle([correct, ...wrong])
}

export function buildLevel2Choices(
  correctInitial: string,
  correctFinal: string,
): { initials: string[]; finals: string[] } {
  return {
    initials: pickFourWithCorrect(INITIALS, correctInitial),
    finals: pickFourWithCorrect(FINALS_LEVEL2, correctFinal),
  }
}
