let ctx: AudioContext | null = null

function getCtx(): AudioContext {
  if (!ctx) ctx = new AudioContext()
  return ctx
}

function beep(freq: number, duration: number, type: OscillatorType): void {
  const c = getCtx()
  const osc = c.createOscillator()
  const g = c.createGain()
  osc.type = type
  osc.frequency.value = freq
  g.gain.setValueAtTime(0.12, c.currentTime)
  g.gain.exponentialRampToValueAtTime(0.01, c.currentTime + duration)
  osc.connect(g)
  g.connect(c.destination)
  osc.start(c.currentTime)
  osc.stop(c.currentTime + duration)
}

export function playCorrect(): void {
  try {
    beep(880, 0.12, 'sine')
    setTimeout(() => beep(1174, 0.15, 'sine'), 70)
  } catch {
    /* ignore */
  }
}

export function playWrong(): void {
  try {
    beep(180, 0.22, 'square')
  } catch {
    /* ignore */
  }
}

/** 闯关成功（与单题正确音效区分，更长一点） */
export function playLevelComplete(): void {
  try {
    const notes = [523, 659, 784, 1047]
    let t = 0
    for (const f of notes) {
      setTimeout(() => beep(f, 0.14, 'sine'), t)
      t += 120
    }
    setTimeout(() => beep(1318, 0.35, 'sine'), t + 40)
  } catch {
    /* ignore */
  }
}