import { describe, expect, it } from 'vitest'
import { cssEscape } from '../src/uitls/cssEscape'
describe('cssEscape', () => {
  it('escape 0', () => {
    const esCaped = cssEscape('0')
    expect(esCaped).toMatchInlineSnapshot('"\\\\30 "')
  })
})
