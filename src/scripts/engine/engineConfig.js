import components from './database/components'

export default {
  game: null,
  renderer: null,
  resolution: { width: 1600, height: 900 },
  fixedDelta: 1 / 60,
  maxFps: 240,
  templates: [...components],
  debug: {
    log: console.log,
    error: console.error,
    warn: console.warn(),
  },
}
