import { describe, expect, it } from 'vitest'

describe('generator', () => {
  it('tokens', () => {
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
})
