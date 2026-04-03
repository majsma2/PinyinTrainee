import './style.css'
import {
  type PracticeMode,
  pickDistinct,
  poolForMode,
} from './data/pinyin.ts'
import { LEVEL2_CHARACTERS, type Level2Entry } from './data/level2Characters.ts'
import { buildLevel2Choices } from './game/level2Options.ts'
import { cancelPinyinVoice, playPinyinToken, playVoiceFile } from './audio/playPinyinVoice.ts'
import { playCorrect, playLevelComplete, playWrong } from './audio/sfx.ts'

const MODES: { id: PracticeMode; label: string }[] = [
  { id: 'initial', label: '声母' },
  { id: 'final', label: '韵母' },
  { id: 'whole', label: '整体认读' },
  { id: 'mixed', label: '混合' },
]

const TARGET_OPTIONS = [10, 20, 30, 50] as const

type Screen = 'home' | 'pickTarget' | 'level1' | 'level2' | 'celebrate'

let screen: Screen = 'home'
let pendingLevel: 1 | 2 = 1
/** 当前关卡内得分，进入关卡时清零 */
let score = 0
/** 本关目标分，选关后设定 */
let targetScore = 10

/** —— 第一关 —— */
let mode: PracticeMode = 'initial'
let l1Options: string[] = []
let l1Target = ''
let l1Solved = false

/** —— 第二关 —— */
let l2Entry: Level2Entry | null = null
let l2Initials: string[] = []
let l2Finals: string[] = []
let l2SelI: string | null = null
let l2SelF: string | null = null
let l2Solved = false

const app = document.querySelector<HTMLDivElement>('#app')!

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props?: Partial<HTMLElementTagNameMap[K]> & { className?: string; text?: string },
  children: (Node | string)[] = [],
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag)
  if (props) {
    const { className, text, ...rest } = props
    if (className) node.className = className
    if (text !== undefined) node.textContent = text
    Object.assign(node, rest)
  }
  for (const c of children) {
    node.append(typeof c === 'string' ? document.createTextNode(c) : c)
  }
  return node
}

function pickRandomLevel2Entry(): Level2Entry {
  return LEVEL2_CHARACTERS[Math.floor(Math.random() * LEVEL2_CHARACTERS.length)]!
}

function ensureLevel2Data() {
  l2Solved = false
  l2SelI = null
  l2SelF = null
  l2Entry = pickRandomLevel2Entry()
  const { initials, finals } = buildLevel2Choices(l2Entry.initial, l2Entry.final)
  l2Initials = initials
  l2Finals = finals
}

function goHome() {
  cancelPinyinVoice()
  screen = 'home'
  renderApp()
}

function updateLevelScoreEl() {
  const elScore = document.getElementById('level-score-line')
  if (elScore) {
    elScore.textContent = `得分 ${score} / 目标 ${targetScore}`
  }
}

function levelScoreHeader(title: string): HTMLElement {
  return el('header', { className: 'header' }, [
    el('h1', { className: 'title', text: title }),
    el('div', {
      className: 'score score--level',
      id: 'level-score-line',
      text: `得分 ${score} / 目标 ${targetScore}`,
    }),
  ])
}

function levelTop(title: string): HTMLElement {
  const wrap = el('div', { className: 'level-top' })
  const back = el('button', {
    type: 'button',
    className: 'btn-back',
    text: '← 返回首页',
  })
  back.addEventListener('click', goHome)
  wrap.append(back, levelScoreHeader(title))
  return wrap
}

function mountHome() {
  const header = el('header', { className: 'header home-header' }, [
    el('h1', { className: 'title home-main-title', text: '拼音练习' }),
  ])
  const hint = el('p', {
    className: 'hint',
    text: '请选择要练习的关卡：',
  })
  const cards = el('div', { className: 'home-cards' })

  const c1 = el('button', { type: 'button', className: 'home-card' })
  c1.append(
    el('span', { className: 'home-card-title', text: '第一关' }),
    el('span', { className: 'home-card-desc', text: '听读音，选择正确的音节' }),
  )
  c1.addEventListener('click', () => {
    cancelPinyinVoice()
    pendingLevel = 1
    screen = 'pickTarget'
    renderApp()
  })

  const c2 = el('button', { type: 'button', className: 'home-card' })
  c2.append(
    el('span', { className: 'home-card-title', text: '第二关' }),
    el('span', { className: 'home-card-desc', text: '听读音，选出字的声母和韵母' }),
  )
  c2.addEventListener('click', () => {
    cancelPinyinVoice()
    pendingLevel = 2
    screen = 'pickTarget'
    renderApp()
  })

  cards.append(c1, c2)
  app.append(header, hint, cards)
}

function mountPickTarget() {
  const lvlName = pendingLevel === 1 ? '第一关' : '第二关'
  const wrap = el('div', { className: 'level-top' })
  const back = el('button', {
    type: 'button',
    className: 'btn-back',
    text: '← 返回',
  })
  back.addEventListener('click', goHome)
  const header = el('header', { className: 'header' }, [
    el('h1', { className: 'title', text: `选择「${lvlName}」目标` }),
  ])
  wrap.append(back, header)
  app.append(wrap)

  const hint = el('p', {
    className: 'hint',
    text: '达到目标分数即闯关成功。请选目标分数：',
  })
  const grid = el('div', { className: 'target-grid' })
  for (const t of TARGET_OPTIONS) {
    const btn = el('button', {
      type: 'button',
      className: 'target-btn',
      text: `${t} 分`,
    })
    btn.addEventListener('click', () => {
      targetScore = t
      score = 0
      cancelPinyinVoice()
      screen = pendingLevel === 1 ? 'level1' : 'level2'
      if (screen === 'level2') ensureLevel2Data()
      renderApp()
      if (screen === 'level1') startLevel1Question()
      else queueMicrotask(() => l2Entry && playVoiceFile(l2Entry.voice))
    })
    grid.append(btn)
  }
  app.append(hint, grid)
}

function mountCelebrate() {
  const title =
    pendingLevel === 1 ? '第一关' : '第二关'
  const box = el('div', { className: 'celebrate' })
  box.append(
    el('div', { className: 'celebrate-title', text: '闯关成功！' }),
    el('p', {
      className: 'celebrate-sub',
      text: `「${title}」已达成 ${targetScore} 分目标（当前 ${score} 分）。`,
    }),
  )
  const btn = el('button', {
    type: 'button',
    className: 'btn-primary',
    text: '返回首页',
  })
  btn.addEventListener('click', goHome)
  box.append(btn)
  app.append(box)
  queueMicrotask(() => playLevelComplete())
}

function renderApp() {
  cancelPinyinVoice()
  app.innerHTML = ''

  if (screen === 'home') {
    mountHome()
    return
  }

  if (screen === 'pickTarget') {
    mountPickTarget()
    return
  }

  if (screen === 'celebrate') {
    mountCelebrate()
    return
  }

  if (screen === 'level1') {
    mountLevel1()
    return
  }

  if (!l2Entry) ensureLevel2Data()
  mountLevel2()
}

function mountLevel1() {
  app.append(levelTop('第一关'))

  const modeRow = el('div', { className: 'mode-row' })
  for (const m of MODES) {
    const btn = el('button', {
      type: 'button',
      className: 'mode-btn' + (mode === m.id ? ' mode-btn--active' : ''),
      text: m.label,
    })
    btn.addEventListener('click', () => {
      if (mode === m.id) return
      mode = m.id
      l1Solved = false
      l1Options = []
      l1Target = ''
      renderApp()
      startLevel1Question()
    })
    modeRow.append(btn)
  }

  const hint = el('p', {
    className: 'hint',
    text: '听一听，下面哪个是它读的？点对了加一分。',
  })

  const controls = el('div', { className: 'controls' })
  const replayBtn = el('button', {
    type: 'button',
    className: 'btn-secondary',
    text: '再听一遍',
  })
  replayBtn.addEventListener('click', () => {
    if (!l1Target) return
    playPinyinToken(l1Target)
  })
  controls.append(replayBtn)

  const msg = el('p', { className: 'message', id: 'message', text: '\u00a0' })

  const grid = el('div', { className: 'grid' })
  for (let i = 0; i < 4; i++) {
    const label = l1Options[i] ?? ''
    const btn = el('button', {
      type: 'button',
      className: 'option',
      text: label,
    }) as HTMLButtonElement
    btn.dataset.value = label
    btn.addEventListener('click', () => onLevel1Pick(btn))
    grid.append(btn)
  }

  app.append(modeRow, hint, controls, msg, grid)
}

function mountLevel2() {
  if (!l2Entry) return

  app.append(levelTop('第二关'))

  const hint = el('p', {
    className: 'hint hint--l2',
    text: '听读音，选出声母和韵母；三拼音节（如「两」「黄」）选带介音的韵母 iang、uang 等。都选对加一分。',
  })

  const charRow = el('div', { className: 'l2-char-row' })
  const charBox = el('div', {
    className: 'l2-char',
    id: 'l2-char',
    text: l2Entry.char,
  })
  const replayBtn = el('button', {
    type: 'button',
    className: 'l2-replay',
  })
  replayBtn.setAttribute('aria-label', '再听一遍')
  replayBtn.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>'
  replayBtn.addEventListener('click', () => {
    if (l2Entry) playVoiceFile(l2Entry.voice)
  })
  charRow.append(charBox, replayBtn)

  const msg = el('p', { className: 'message message--l2', id: 'l2-message', text: '\u00a0' })

  const labI = el('div', { className: 'l2-row-label', text: '声母（点选一个）' })
  const rowI = el('div', { className: 'grid grid--l2' })
  for (const s of l2Initials) {
    const btn = el('button', {
      type: 'button',
      className: 'option l2-opt',
      text: s,
    }) as HTMLButtonElement
    btn.dataset.role = 'initial'
    btn.dataset.value = s
    btn.addEventListener('click', () => onLevel2PickInitial(btn))
    rowI.append(btn)
  }

  const labF = el('div', { className: 'l2-row-label', text: '韵母（点选一个）' })
  const rowF = el('div', { className: 'grid grid--l2' })
  for (const s of l2Finals) {
    const btn = el('button', {
      type: 'button',
      className: 'option l2-opt',
      text: s,
    }) as HTMLButtonElement
    btn.dataset.role = 'final'
    btn.dataset.value = s
    btn.addEventListener('click', () => onLevel2PickFinal(btn))
    rowF.append(btn)
  }

  app.append(hint, charRow, msg, labI, rowI, labF, rowF)
  syncLevel2SelectionStyles()
}

function syncLevel2SelectionStyles() {
  app.querySelectorAll<HTMLButtonElement>('.l2-opt').forEach((btn) => {
    const r = btn.dataset.role
    const v = btn.dataset.value ?? ''
    const on =
      (r === 'initial' && l2SelI === v) || (r === 'final' && l2SelF === v)
    btn.classList.toggle('option--selected', on)
  })
}

function startLevel1Question() {
  if (screen !== 'level1') return
  l1Solved = false
  const pool = poolForMode(mode)
  l1Options = pickDistinct(pool, 4)
  l1Target = l1Options[Math.floor(Math.random() * 4)]

  const grid = app.querySelector('.grid:not(.grid--l2)')
  const buttons = grid?.querySelectorAll<HTMLButtonElement>('.option:not(.l2-opt)')
  const msg = document.getElementById('message')
  if (msg) msg.textContent = '\u00a0'

  if (buttons) {
    buttons.forEach((btn, i) => {
      btn.textContent = l1Options[i]
      btn.dataset.value = l1Options[i]
      btn.classList.remove('option--correct', 'option--wrong')
      btn.disabled = false
    })
  }

  queueMicrotask(() => playPinyinToken(l1Target))
}

function finishLevelAndCelebrate() {
  cancelPinyinVoice()
  screen = 'celebrate'
  renderApp()
}

function onLevel1Pick(btn: HTMLButtonElement) {
  if (l1Solved || screen !== 'level1') return
  const value = btn.dataset.value ?? ''
  const msg = document.getElementById('message')

  if (value === l1Target) {
    l1Solved = true
    btn.classList.add('option--correct')
    playCorrect()
    score += 1
    updateLevelScoreEl()
    if (msg) msg.textContent = '太棒了！'
    app.querySelectorAll<HTMLButtonElement>('.grid:not(.grid--l2) .option:not(.l2-opt)').forEach((b) => {
      b.disabled = true
    })

    if (score >= targetScore) {
      setTimeout(() => finishLevelAndCelebrate(), 750)
      return
    }

    setTimeout(() => {
      startLevel1Question()
      l1Solved = false
      app.querySelectorAll<HTMLButtonElement>('.grid:not(.grid--l2) .option:not(.l2-opt)').forEach((b) => {
        b.classList.remove('option--correct', 'option--wrong')
        b.disabled = false
      })
      if (msg) msg.textContent = '\u00a0'
      playPinyinToken(l1Target)
    }, 900)
    return
  }

  btn.classList.add('option--wrong')
  playWrong()
  if (msg) msg.textContent = '不对哦，再选一次。'
}

function onLevel2PickInitial(btn: HTMLButtonElement) {
  if (l2Solved || screen !== 'level2') return
  l2SelI = btn.dataset.value ?? null
  syncLevel2SelectionStyles()
  tryLevel2Submit()
}

function onLevel2PickFinal(btn: HTMLButtonElement) {
  if (l2Solved || screen !== 'level2') return
  l2SelF = btn.dataset.value ?? null
  syncLevel2SelectionStyles()
  tryLevel2Submit()
}

function tryLevel2Submit() {
  if (!l2Entry || l2Solved) return
  if (l2SelI === null || l2SelF === null) return

  const msg = document.getElementById('l2-message')
  const ok = l2SelI === l2Entry.initial && l2SelF === l2Entry.final

  if (ok) {
    l2Solved = true
    playCorrect()
    score += 1
    updateLevelScoreEl()
    if (msg) msg.textContent = '太棒了！'
    app.querySelectorAll<HTMLButtonElement>('.l2-opt').forEach((b) => {
      b.disabled = true
      const match =
        (b.dataset.role === 'initial' && b.dataset.value === l2Entry!.initial) ||
        (b.dataset.role === 'final' && b.dataset.value === l2Entry!.final)
      if (match) b.classList.add('option--correct')
    })

    if (score >= targetScore) {
      setTimeout(() => finishLevelAndCelebrate(), 750)
      return
    }

    setTimeout(() => {
      ensureLevel2Data()
      renderApp()
      queueMicrotask(() => {
        if (l2Entry) playVoiceFile(l2Entry.voice)
      })
    }, 900)
    return
  }

  playWrong()
  if (msg) msg.textContent = '不对哦，请重新选择声母和韵母。'
  l2SelI = null
  l2SelF = null
  app.querySelectorAll<HTMLButtonElement>('.l2-opt').forEach((b) => {
    b.classList.remove('option--selected', 'option--wrong')
  })
  syncLevel2SelectionStyles()
}

renderApp()
