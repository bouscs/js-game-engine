import phaserRenderer from '../engine/phaserRenderer'
import gameConfig from './gameConfig'
import matterPhysics from '../engine/matterPhysics'

export default {
  game: gameConfig,
  renderer: phaserRenderer,
  physics: matterPhysics,
  resolution: { width: 1600, height: 900 },
  maxFps: 90,
}
