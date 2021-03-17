import EngineComponent from './EngineComponent'
import GameObject from './GameObject'
import Camera from './Camera'
import { createNode } from '../nodeObject'

/**
 * A template of GameObjects that can be thought of actors
 * @typedef {Scene}
 */
export default class Scene extends EngineComponent {
  constructor(ctx, template) {
    super(ctx, template)

    this.templateLoaders.push(c => {
      this.objects = []

      Object.assign(this.state, c.store)

      if (c.camera) {
        this.state.camera = new Camera(this.ctx, c.camera)
        this.state.camera.load()
      }

      c.objects.forEach(gameObject => {
        const fTemplate = this.ctx.findTemplate(gameObject)
        const newObject = new GameObject(ctx, fTemplate)
        newObject.load()
        newObject.scene = this
        //const newObject = createNode(this.ctx, fTemplate)
        this.objects.push(newObject)
      })
    })
  }

  findObject(name) {
    for (const o of this.objects) {
      if (o.name === name) return o
    }
  }
}
