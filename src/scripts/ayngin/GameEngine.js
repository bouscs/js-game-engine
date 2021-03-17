import EventEmitter from 'events'
import * as builtins from './components'

class Context extends EventEmitter {
  constructor(engine) {
    super()

    this.engine = engine
  }
}

export class GameEngine extends EventEmitter {
  constructor(config) {
    super()

    this.config = config

    this.clock = {
      deltaCounter: 0,
      deltas: 0,
      lifetime: 0,
      fixedDelta: 1 / this.config.maxFps,
      fixeds: 0,
    }

    this.ctx = new Context()
  }

  start() {
    let lastNow = Date.now() / 1000
    this.clock.loopInterval = setInterval(() => {
      const now = Date.now() / 1000

      this.tick(now - lastNow)

      lastNow = now
    }, this.clock.fixedDelta * 1000)

    this.ctx.emit('start')
  }

  tick(delta) {
    this.ctx.delta = delta

    this.clock.lifetime += delta
    this.clock.deltas++
    this.clock.deltaCounter += delta

    const fixedTickAmount = Math.floor(
      this.clock.deltaCounter / this.clock.fixedDelta
    )

    if (this.renderer) this.emit('render')
    this.ctx.emit('beforeUpdate', delta)
    this.ctx.emit('update', delta)
    this.ctx.emit('afterUpdate', delta)

    this.fixedTick(fixedTickAmount)

    this.clock.deltaCounter %= this.clock.fixedDelta
  }

  fixedTick(amount) {
    const delta = this.ctx.delta
    this.ctx.delta = null
    for (let i = 0; i < amount; i++) {
      this.clock.fixeds++

      this.ctx.emit('beforeFixedUpdate')
      this.ctx.emit('fixedUpdate')
      this.ctx.emit('afterFixedUpdate')
    }
    this.ctx.delta = delta
  }

  async use(...component) {
    for (const setup of component) {
      await setup(this.ctx)
    }
  }
}

export const createEngine = function (config = { maxFps: 240 }) {
  const engine = new GameEngine(config)

  return engine
}

export { builtins }
