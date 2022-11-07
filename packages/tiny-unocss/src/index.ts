import { createHash } from 'crypto'
import type { Plugin } from 'vite'
import { generator } from './generator'
import type { TinyUnocssRule } from './types'
import { defaultRules } from './presets'

export function getHash(input: string, length = 8) {
  return createHash('sha256')
    .update(input)
    .digest('hex')
    .slice(0, length)
}

const VIRTUALPREFIX = '/@virtual/tinyunocss'

function TinyUnocssVitePlugin(rules: TinyUnocssRule[] = defaultRules): Plugin {
  const generate = generator(rules)
  const map = new Map<string, [string, string]>()

  return {
    name: 'tiny-unocss',
    enforce: 'post',
    transform(code, id) {
      if (id.endsWith('.css'))
        return null
      const style = generate(code)
      if (!style)
        return null
      const hash = getHash(id)
      map.set(hash, [id, style])
      return `import "${VIRTUALPREFIX}${hash}.css";${code}`
    },
    resolveId(id) {
      return id.startsWith(VIRTUALPREFIX) ? id : null
    },
    load(id) {
      if (!id.startsWith(VIRTUALPREFIX))
        return null

      const hash = id.slice(VIRTUALPREFIX.length, -'.css'.length)
      const [source, css] = map.get(hash) || []

      if (source)
        this.addWatchFile(source) // 为什么要加这一句?
      return css
    },
  }
}

export default TinyUnocssVitePlugin
