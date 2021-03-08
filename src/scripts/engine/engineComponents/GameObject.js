/**
 * GameObjects populate a scene as the main actors
 * @typedef {GameObject}
 */

import EngineComponent from './EngineComponent.js'
import Component from './Component'

export default class GameObject extends EngineComponent {
  constructor(ctx, template) {
    super(ctx, template)

    this.templateLoaders.push(loadTemplate => {
      this.state = {
        position: { x: 0, y: 0 },
        rotation: 0,
        size: { x: 1, y: 1 },
        velocity: {
          x: 0,
          y: 0,
        },
      }
      this.children = []
      this.components = {}

      this.state = _.merge(this.state, loadTemplate.store)

      if (loadTemplate.components) {
        loadTemplate.components.forEach(componentConfig => {
          if (componentConfig.base) {
            if (this.components[componentConfig.base]) {
              this.ctx.error(
                'Component ' +
                  componentConfig.base +
                  ' already exists on ' +
                  this.name
              )
              return
            }

            const type = this.ctx.findTemplate(componentConfig.base)

            const custom = _.merge({}, type)

            if (componentConfig.template) {
              custom.template = _.merge({}, componentConfig.template)
            }

            const instance = new Component(this.ctx, custom, this)
            instance.load()

            this.components[componentConfig.base] = instance
          } else {
            if (this.components[componentConfig.name]) {
              this.ctx.error(
                'Component ' +
                  componentConfig.name +
                  ' already exists on ' +
                  this.name
              )
              return
            }

            const instance = new Component(this.ctx, componentConfig, this)
            instance.load()
          }
        })
      }

      if (loadTemplate.children)
        loadTemplate.children.forEach(child => {
          const childTemplate = this.ctx.findTemplate(child)
          const instance = new GameObject(ctx, childTemplate)
          instance.load()

          this.children.push(instance)
        })
    })
  }
}
