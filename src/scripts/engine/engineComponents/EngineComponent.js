import EventEmitter from 'events'
import { on, off } from '../ev'

/**
 * @typedef {Object} Template
 * @property {string} name Instance name
 * @property {Function} start Called on Engine's "start" event
 * @property {Function<number>} update Called on Engine's "update" event
 * @property {Function} fixedUpdate Called on Engine's "fixedUpdate" event
 */

/**
 * @typedef {import('../Engine.js').Engine} Engine
 */

/**
 * Any part of the Engine with its own lifecycle
 * @typedef {Object} EngineComponent
 * @param {String} name
 * @param {Template} template
 * @property {Engine} ctx
 */
export default class EngineComponent extends EventEmitter {
  /**
   * @param {Engine} ctx
   * @param {Template} template
   */
  constructor(ctx, template) {
    super()

    this.ctx = ctx

    this.template = this.ctx.getFullTemplate(template)

    /**
     * Functions called in order when state is initialized by this.load()
     * @type {Array<Function<Template>>}
     */
    this.templateLoaders = [
      loadTemplate => {
        if (loadTemplate.name == null) {
          throw 'EnginePart config parameter "name" cannot be null'
        }

        this.name = loadTemplate.name

        if (loadTemplate.start) {
          this.start = loadTemplate.start
          this.ctx.on('start', () => this.start())
        }
        if (loadTemplate.update) {
          this.update = loadTemplate.update
          this.ctx.on('update', delta => this.update(delta))
        }
        if (loadTemplate.fixedUpdate) {
          this.fixedUpdate = loadTemplate.fixedUpdate
          this.ctx.on('fixedUpdate', () => this.fixedUpdate())
        }
        if (loadTemplate.afterFixedUpdate) {
          this.afterFixedUpdate = loadTemplate.afterFixedUpdate
          this.ctx.on('afterFixedUpdate', () => this.afterFixedUpdate())
        }
        if (loadTemplate.beforeFixedUpdate) {
          this.beforeFixedUpdate = loadTemplate.beforeFixedUpdate
          this.ctx.on('beforeFixedUpdate', () => this.beforeFixedUpdate())
        }

        if (loadTemplate.actions) {
          this.actions = {}

          Object.keys(loadTemplate.actions).forEach(actionName => {
            this.actions[actionName] = loadTemplate.actions[actionName].bind(
              this
            )
          })
        }

        if (loadTemplate.listen) {
          this.listen = {}

          Object.keys(loadTemplate.listen).forEach(emitter => {
            if (!this.listen[emitter]) {
              this.listen[emitter] = {}
            }

            Object.keys(loadTemplate.listen[emitter]).forEach(eventName => {
              this.listen[emitter][eventName] = loadTemplate.listen[emitter][
                eventName
              ].bind(this)

              on(this[emitter], eventName, this.listen[emitter][eventName])
            })
          })
        }

        if (template.refs) {
          this.ctx.on('initRefs', () => {
            this.refs = template.refs.bind(this)()
          })
        }
      },
    ]

    this.load = function () {
      this.state = {}

      this.templateLoaders.forEach(init => {
        try {
          init(this.template)
        } catch (error) {
          this.ctx.error(error)
        }
      })
    }
  }

  loadState(state) {
    this.load()

    this.state = _.merge(this.state, state)
  }

  setFixedInterval(callback, fixedFrames) {
    if (!this.intervals) {
      this.intervals = {}
      this.intervalCounter = 0
    }

    const interval = {
      frameCounter: 0,
      duration: fixedFrames,
      callback: callback,
    }

    this.intervals[this.intervalCounter] = interval

    interval.listener = () => {
      interval.frameCounter++

      if (interval.frameCounter >= interval.duration) {
        interval.callback()
        interval.frameCounter = 0
      }
    }

    interval.internal = on(this.ctx, 'fixedUpdate', interval.listener)

    interval.intervalCounter++

    return interval
  }

  clearFixedInterval(interval) {
    off(this.ctx, 'fixedUpdate', interval.listener)
  }
}
