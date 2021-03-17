export default {
  name: 'spriteRendererNode',
  use: ['transform'],
  vars: {
    image: '',
    spriteSize: {
      x: 1,
      y: 1,
    },
    spriteOffset: {
      x: 0,
      y: 0,
    },
  },
  setup(ctx) {
    this.rendererData = ctx.renderer.addImage(this.image)

    this.render = ctx.renderer.renderImage.bind(this)

    ctx.on('render', () => this.render())
  },
}
