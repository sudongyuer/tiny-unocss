import { cssEscape } from '../uitls/cssEscape'
import { directionMap } from '../maps'
import type { TinyUnocssRule } from '../types'

export const defaultRules: TinyUnocssRule[] = [
  [/^p([trbl]?)-(\d+)$/, (f, d, s) => { return `.${cssEscape(f)} { padding${directionMap[d] || ''} : ${(+s) / 4}rem; }` }],
]
