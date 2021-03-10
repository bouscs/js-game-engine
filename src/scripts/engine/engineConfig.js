import components from './database/components'
import gameObjects from './database/gameObjects'

export default {
  game: null,
  renderer: null,
  resolution: { width: 1600, height: 900 },
  fixedDelta: 1 / 60,
  maxFps: 240,
  templates: [...components, ...gameObjects],
  debug: {
    log: console.log,
    error: console.error,
    warn: console.warn(),
  },
}
