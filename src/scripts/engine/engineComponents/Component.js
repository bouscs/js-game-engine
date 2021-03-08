/**
 * Components are attached to GameObjects
 */

import EngineComponent from './EngineComponent.js'

export default class Component extends EngineComponent {
  constructor(ctx, template, gameObject) {
    super(ctx, template)

    this.gameObject = gameObject

    this.templateLoaders.push(c => {
      Object.assign(this, _.merge(this, c))
      Object.assign(_.merge(this, c.template))
      this.state = _.merge(this.state, c.store)
      this.state = _.merge(this.state, c.template.store)

      if (c.init) {
        c.init.bind(this)(c)
      }
    })
  }
}
