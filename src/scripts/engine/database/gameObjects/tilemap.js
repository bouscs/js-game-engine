export default {
  name: 'tilemap',
  components: [
    {
      base: 'tilemapRenderer',
      template: {
        layers: {
          base: {
            renderTileset: 'overworld',
            tileData: [
              [0, 0, 0, 0],
              [0, 0, 0, 0],
              [0, 0, 0, 0],
              [0, 0, 0, 0],
            ],
          },
        },
      },
    },
  ],
}
