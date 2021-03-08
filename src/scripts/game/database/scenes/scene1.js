export default {
  name: 'Scene 1',
  objects: [
    'player',
    'fourWalls',
    {
      name: 'debugText',
      components: [
        {
          base: 'textRenderer',
          store: {
            size: {
              x: 5,
              y: 1,
            },
          },
          template: {
            text: 'teste',
          },
        },
      ],
      update(delta) {
        this.components.textRenderer.text = Math.floor(1 / delta)
      },
    },
  ],
  camera: {
    store: {
      width: 16,
      position: {
        x: 0,
        y: 0,
      },
    },
  },
}
