export default {
  name: 'tilemapRenderer',
  config: {
    tileSize: {
      x: 1,
      y: 1,
    },
    tileCount: {
      x: 10,
      y: 10,
    },
  },
  layers: {
    base: {
      renderTileset: '',
      tileData: [],
    },
  },
  init() {
    this.rendererData = {}

    if (this.gameObject.state.layers)
      Object.keys(this.gameObject.state.layers).forEach(layer => {
        console.log(this.gameObject.state.layers[layer])
        if (this.gameObject.state.layers[layer].renderTileset != null) {
          this.rendererData[layer] = this.ctx.renderer.addTilemap(
            this.gameObject.state.layers[layer]
          )
        }
      })

    console.log(this.rendererData)

    this.render = this.ctx.renderer.renderTilemap.bind(this)

    this.ctx.on('render', () => this.render())
  },
}
