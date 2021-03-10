import importRange from '../../engine/importRange'

export default {
  alba: {
    walk: {
      down: importRange('alba/walkdown{i}.png', 1, 4),
      up: importRange('alba/walkup{i}.png', 1, 4),
      left: importRange('alba/walkleft{i}.png', 1, 4),
      right: importRange('alba/walkright{i}.png', 1, 4),
    },
  },
  test: 'default.png',
  player: 'alba1.png',
}
