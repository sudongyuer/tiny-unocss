import type { Plugin } from 'vite'

function VitePluginReactInspector(): Plugin {
  return {
    name: 'tiny-unocss',
    enforce: 'post',
    transform(code, id) {
      if (id.endsWith('.css'))
        return null
    },
  }
}

export default VitePluginReactInspector
