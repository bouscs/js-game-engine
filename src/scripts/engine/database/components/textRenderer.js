export default {
  name: 'textRenderer',
  text: 'Text',
  init() {
    this.state.rendererData = this.ctx.renderer.addText(this.text)

    this.state.render = this.ctx.renderer.renderText.bind(this)

    this.ctx.on('render', () => this.state.render())
  },
}
