import type { Plugin } from 'vite'

function VitePluginReactInspector(): Plugin {
  return {
    name: 'tiny-unocss',
    apply: 'serve',
  }
}

export default VitePluginReactInspector
