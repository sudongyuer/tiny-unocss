import { describe, expect, test } from 'vitest'
import { generator } from '../src/generator'
import { defaultRules } from '../src/presets'

describe('generator', () => {
  test('parse tokens', () => {
    const code = 'pb-12 text-2xl text-red-500 padding-4;padding-5 "hello"'
    const tokens = new Set(code.split(/[\s'"`;]/g))
    expect(tokens).toMatchInlineSnapshot(`
      Set {
        "pb-12",
        "text-2xl",
        "text-red-500",
        "padding-4",
        "padding-5",
        "",
        "hello",
      }
    `)
  })

  test('generator', () => {
    const code = 'pl-4 pt-2 pr-8 pb-12'
    const generate = generator({ rules: defaultRules })
    const generateCss = generate(code)
    expect(generateCss).toMatchInlineSnapshot(`
      ".pl-4 { padding-left : 1rem; }
      .pt-2 { padding-top : 0.5rem; }
      .pr-8 { padding-right : 2rem; }
      .pb-12 { padding-bottom : 3rem; }"
    `)
  })
})
