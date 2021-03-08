import EngineComponent from './EngineComponent'
export default class Camera extends EngineComponent {
  constructor(ctx, config) {
    if (!config.name) config.name = 'Camera'
    super(ctx, config)

    this.templateLoaders.push(c => {
      this.state = {
        width: 10,
        position: { x: 0, y: 0 },
      }

      Object.assign(this.state, c.store)

      this.state.rendererData = this.ctx.renderer.addMainCamera()
      this.state.render = this.ctx.renderer.renderCamera.bind(this)

      this.ctx.on('render', () => this.state.render())
    })
  }
}
