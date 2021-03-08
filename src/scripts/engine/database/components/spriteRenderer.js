export default {
  name: 'spriteRenderer',
  image: '',
  size: {
    x: 1,
    y: 1,
  },
  offset: {
    x: 0,
    y: 0,
  },
  init() {
    this.state.rendererData = this.ctx.renderer.addImage(this.image)

    this.state.render = this.ctx.renderer.renderImage.bind(this)

    this.ctx.on('render', () => this.state.render())
  },
}
