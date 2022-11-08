import { directionMap, e } from '../uitls'
import type { TinyUnocssRule } from '../types'

export const defaultRules: TinyUnocssRule[] = [
  [/^p-(\d+)([a-z]*)$/, ([f, s, unit]) => `.${e(f)} { padding: ${unit ? s + unit : `${(+s) / 4}rem`}; }`],
  [/^p([trlb])-(\d+)([a-z]*)$/, ([f, d, s, unit]) => `.${e(f)} { padding${directionMap[d] || ''} : ${unit ? s + unit : `${(+s) / 4}rem`}; }`],
]
