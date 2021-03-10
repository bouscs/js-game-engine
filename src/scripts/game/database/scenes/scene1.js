export default {
  name: 'Scene 1',
  objects: ['player', 'fourWalls', 'map'],
  camera: {
    store: {
      width: 16,
      position: {
        x: 0,
        y: 0,
      },
    },
  },
  start() {
    console.log(this)
  },
}
