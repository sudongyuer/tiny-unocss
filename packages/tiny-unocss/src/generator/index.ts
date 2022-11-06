import type { TinyUnocssRule } from '../types'

export function generator(rules: TinyUnocssRule[]) {
  return (code: string) => {
    const tokens = new Set(code.split(/[\s'"`;]/g))
    const css: string[] = []
  }
}
