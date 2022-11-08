import { createHash } from 'crypto'
import type { Plugin, ViteDevServer } from 'vite'
import { generator } from './generator'
import { defaultRules } from './presets'
import type { TinyUnocssConfig } from './types'

export function getHash(input: string, length = 8) {
  return createHash('sha256')
    .update(input)
    .digest('hex')
    .slice(0, length)
}

const VIRTUAL_PREFIX = '/@virtual/tinyunocss'

function TinyUnocssVitePlugin(config: TinyUnocssConfig = { rules: defaultRules }): Plugin {
  const generate = generator(config)
  const map = new Map<string, [string, string]>()
  let server: ViteDevServer | undefined
  const invalidate = (hash: string) => {
    if (!server)
      return
    const id = `${VIRTUAL_PREFIX}${hash}.css`
    const mod = server.moduleGraph.getModuleById(id)
    if (!mod)
      return
    server.reloadModule(mod)
  }

  return {
    name: 'tiny-unocss',
    enforce: 'post',
    configureServer(_server) {
      server = _server
    },
    transform(code, id) {
      if (id.endsWith('.css'))
        return null
      const style = generate(code)
      if (!style)
        return null
      const hash = getHash(id)
      map.set(hash, [id, style])
      invalidate(hash)
      return `import "${VIRTUAL_PREFIX}${hash}.css";${code}`
    },
    resolveId(id) {
      return id.startsWith(VIRTUAL_PREFIX) ? id : null
    },
    load(id) {
      if (!id.startsWith(VIRTUAL_PREFIX))
        return null

      const hash = id.slice(VIRTUAL_PREFIX.length, -'.css'.length)
      const [source, css] = map.get(hash) || []

      if (source)
        this.addWatchFile(source) // 为什么要加这一句?

      return `/* ${source} */\n${css}`
    },
  }
}

export default TinyUnocssVitePlugin
