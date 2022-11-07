import { describe, expect, it } from 'vitest'
import { cssEscape } from '../src/uitls/cssEscape'
import type { TinyUnocssRule } from '../src/types'
import { generator } from '../src/generator'
import { directionMap } from '../src/maps'

describe('generator', () => {
  it('parse tokens', () => {
    const code = 'text-2xl text-red-500 padding-4;padding-5 "hello"'
    const tokens = new Set(code.split(/[\s'"`;]/g))
    expect(tokens).toMatchInlineSnapshot(`
      Set {
        "text-2xl",
        "text-red-500",
        "padding-4",
        "padding-5",
        "",
        "hello",
      }
    `)
  })

  it('generator', () => {
    const rule: TinyUnocssRule
      = [/^p([trbl]?)-(\d)$/, (f, d, s) => {
        return `.${cssEscape(f)} { padding${directionMap[d] || ''} : ${(+s) / 4}rem; }`
      }]
    const code = 'pl-4 pt-2 pr-8 pb-12'
    const generate = generator([rule])
    const generateCss = generate(code)
    expect(generateCss).toMatchInlineSnapshot(`
      ".pl-4 { padding-left : 1rem; }
      .pt-2 { padding-top : 0.5rem; }
      .pr-8 { padding-right : 2rem; }"
    `)
  })
})
