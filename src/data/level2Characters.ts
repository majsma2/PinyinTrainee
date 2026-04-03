/**
 * 第二关：单字音节，声母 + 韵母 与一年级表一致；voice 为 pinyin-voice 文件名。
 * 含三拼音节（如 两→l+iang、黄→h+uang）。
 */
export type Level2Entry = {
  char: string
  initial: string
  final: string
  /** 如 ma1.mp3 */
  voice: string
}

export const LEVEL2_CHARACTERS: Level2Entry[] = [
  { char: '妈', initial: 'm', final: 'a', voice: 'ma1.mp3' },
  { char: '八', initial: 'b', final: 'a', voice: 'ba1.mp3' },
  { char: '爸', initial: 'b', final: 'a', voice: 'ba4.mp3' },
  { char: '坡', initial: 'p', final: 'o', voice: 'po1.mp3' },
  { char: '摸', initial: 'm', final: 'o', voice: 'mo1.mp3' },
  { char: '佛', initial: 'f', final: 'o', voice: 'fo2.mp3' },
  { char: '得', initial: 'd', final: 'e', voice: 'de2.mp3' },
  { char: '特', initial: 't', final: 'e', voice: 'te4.mp3' },
  { char: '呢', initial: 'n', final: 'e', voice: 'ne4.mp3' },
  { char: '勒', initial: 'l', final: 'e', voice: 'le4.mp3' },
  { char: '哥', initial: 'g', final: 'e', voice: 'ge1.mp3' },
  { char: '科', initial: 'k', final: 'e', voice: 'ke1.mp3' },
  { char: '喝', initial: 'h', final: 'e', voice: 'he1.mp3' },
  { char: '鸡', initial: 'j', final: 'i', voice: 'ji1.mp3' },
  { char: '七', initial: 'q', final: 'i', voice: 'qi1.mp3' },
  { char: '西', initial: 'x', final: 'i', voice: 'xi1.mp3' },
  { char: '知', initial: 'zh', final: 'i', voice: 'zhi1.mp3' },
  { char: '吃', initial: 'ch', final: 'i', voice: 'chi1.mp3' },
  { char: '师', initial: 'sh', final: 'i', voice: 'shi1.mp3' },
  { char: '日', initial: 'r', final: 'i', voice: 'ri4.mp3' },
  { char: '资', initial: 'z', final: 'i', voice: 'zi1.mp3' },
  { char: '次', initial: 'c', final: 'i', voice: 'ci4.mp3' },
  { char: '思', initial: 's', final: 'i', voice: 'si1.mp3' },
  { char: '衣', initial: 'y', final: 'i', voice: 'yi1.mp3' },
  { char: '五', initial: 'w', final: 'u', voice: 'wu3.mp3' },
  { char: '鱼', initial: 'y', final: 'ü', voice: 'yu2.mp3' },
  { char: '也', initial: 'y', final: 'e', voice: 'ye3.mp3' },
  { char: '月', initial: 'y', final: 'üe', voice: 'yue4.mp3' },
  { char: '班', initial: 'b', final: 'an', voice: 'ban1.mp3' },
  { char: '本', initial: 'b', final: 'en', voice: 'ben3.mp3' },
  { char: '宾', initial: 'b', final: 'in', voice: 'bin1.mp3' },
  { char: '文', initial: 'w', final: 'en', voice: 'wen2.mp3' },
  { char: '工', initial: 'g', final: 'ong', voice: 'gong1.mp3' },
  { char: '灯', initial: 'd', final: 'eng', voice: 'deng1.mp3' },
  { char: '听', initial: 't', final: 'ing', voice: 'ting1.mp3' },
  { char: '排', initial: 'p', final: 'ai', voice: 'pai2.mp3' },
  { char: '美', initial: 'm', final: 'ei', voice: 'mei3.mp3' },
  { char: '脑', initial: 'n', final: 'ao', voice: 'nao3.mp3' },
  { char: '楼', initial: 'l', final: 'ou', voice: 'lou2.mp3' },
  { char: '九', initial: 'j', final: 'iu', voice: 'jiu3.mp3' },
  { char: '鞋', initial: 'x', final: 'ie', voice: 'xie2.mp3' },
  { char: '决', initial: 'j', final: 'üe', voice: 'jue2.mp3' },
  { char: '汉', initial: 'h', final: 'an', voice: 'han4.mp3' },
  { char: '喷', initial: 'p', final: 'en', voice: 'pen1.mp3' },
  { char: '林', initial: 'l', final: 'in', voice: 'lin2.mp3' },
  { char: '昆', initial: 'k', final: 'un', voice: 'kun1.mp3' },
  { char: '军', initial: 'j', final: 'ün', voice: 'jun1.mp3' },
  { char: '王', initial: 'w', final: 'ang', voice: 'wang2.mp3' },
  { char: '横', initial: 'h', final: 'eng', voice: 'heng2.mp3' },
  { char: '青', initial: 'q', final: 'ing', voice: 'qing1.mp3' },
  { char: '红', initial: 'h', final: 'ong', voice: 'hong2.mp3' },

  // 三拼音节（示例：两、黄）
  { char: '两', initial: 'l', final: 'iang', voice: 'liang3.mp3' },
  { char: '黄', initial: 'h', final: 'uang', voice: 'huang2.mp3' },
  { char: '江', initial: 'j', final: 'iang', voice: 'jiang1.mp3' },
  { char: '强', initial: 'q', final: 'iang', voice: 'qiang2.mp3' },
  { char: '窗', initial: 'ch', final: 'uang', voice: 'chuang1.mp3' },
  { char: '熊', initial: 'x', final: 'iong', voice: 'xiong2.mp3' },
  { char: '交', initial: 'j', final: 'iao', voice: 'jiao1.mp3' },
  { char: '帅', initial: 'sh', final: 'uai', voice: 'shuai4.mp3' },
  { char: '边', initial: 'b', final: 'ian', voice: 'bian1.mp3' },
  { char: '团', initial: 't', final: 'uan', voice: 'tuan2.mp3' },
]
