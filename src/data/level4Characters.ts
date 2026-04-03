/**
 * 第四关：极生僻、字形复杂的单字（无读音提示），用户根据字形输入无调拼音。
 * syllable 为小写、不含声调，与 `pinyinAnswer.normalizeUserPinyin` 比对一致。
 */
export type Level4Entry = {
  char: string
  syllable: string
}

export const LEVEL4_CHARACTERS: Level4Entry[] = [
  { char: '龘', syllable: 'da' },
  { char: '鷟', syllable: 'zhuo' },
  { char: '齉', syllable: 'nang' },
  { char: '龖', syllable: 'da' },
  { char: '靐', syllable: 'bing' },
  { char: '骉', syllable: 'biao' },
  { char: '鱻', syllable: 'xian' },
  { char: '羴', syllable: 'shan' },
  { char: '猋', syllable: 'biao' },
  { char: '淼', syllable: 'miao' },
  { char: '焱', syllable: 'yan' },
  { char: '犇', syllable: 'ben' },
  { char: '掱', syllable: 'pa' },
  { char: '瞐', syllable: 'mo' },
  { char: '畾', syllable: 'lei' },
  { char: '惢', syllable: 'suo' },
  { char: '尛', syllable: 'mo' },
  { char: '孬', syllable: 'nao' },
  { char: '麤', syllable: 'cu' },
  { char: '赑', syllable: 'bi' },
  { char: '舙', syllable: 'hua' },
  { char: '鼱', syllable: 'jing' },
  { char: '鸗', syllable: 'long' },
  { char: '籱', syllable: 'zhuo' },
  { char: '饕', syllable: 'tao' },
  { char: '餮', syllable: 'tie' },
  { char: '叒', syllable: 'ruo' },
  { char: '叕', syllable: 'zhuo' },
  
]
