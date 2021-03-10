import unnest from './unnestImportsObject'
import Game from './Game.js'
import Scene from './engineComponents/Scene'
import EventEmitter from 'events'
import defaultConfig from './engineConfig'
import { on } from './ev'

/**
 * Settings loaded on Engine constructor
 * @typedef {Object} EngineConfig
 */

const parseImports = importParam => {
  if (typeof importParam === 'string') return importParam

  let resolved = {}

  Object.keys(importParam).forEach(key => {
    if (Array.isArray(importParam[key])) {
      importParam[key].forEach((p, i) => {
        resolved[key + i] = p
      })
    } else resolved[key] = _.merge({}, parseImports(importParam[key]))
  })

  return resolved
}

/**
 * An Engine controls the game meta data as well as the game lifecycle
 * @typedef {Object} Engine
 * @property {EngineConfig} config
 */
class Engine extends EventEmitter {
  /**
   * @param {EngineConfig} engineConfig
   */
  constructor(engineConfig) {
    super()

    // Set Engine configuration
    this.config = _.merge({}, defaultConfig)
    this.config = _.merge(this.config, engineConfig)
    this.game = new Game(this.config.game)
    this.database = _.merge({}, this.game.database)
    this.database.templates.push(...defaultConfig.templates)

    Object.keys(this.database.images).forEach(key => {
      this.database.images[key] = parseImports(this.database.images[key])
    })

    this.database.images = unnest(this.database.images)

    this.fixedDelta = this.config.fixedDelta

    this.input = {
      keys: {
        ArrowUp: false,
        ArrowDown: false,
        ArrowLeft: false,
        ArrowRight: false,
      },
    }

    const ready = {
      renderer: false,
      physics: false,
    }

    const setReady = name => {
      ready[name] = true
      if (Object.keys(ready).every(r => ready[r] === true)) this.emit('ready')
    }

    on(this, 'rendererReady', () => setReady('renderer'))
    on(this, 'physicsReady', () => setReady('physics'))

    // Initialize renderer
    if (this.config.renderer) this.config.renderer(this)

    // Initialize Physics
    if (this.config.physics) this.config.physics(this)
    else this.emit('physicsReady')
  }

  /**
   * Start Engine, load first scene and start main loop
   */
  start() {
    // Initialize state
    this.state = {}
    this.state.deltaCounter = 0
    this.state.deltas = 0
    this.state.fixeds = 0
    this.state.lifetime = 0

    // Load first Scene
    const startingScene = this.game.database.scenes[0]
    this.state.scenes = [new Scene(this, startingScene)]
    this.state.scenes[0].load()

    this.emit('initRefs')
    this.emit('start')

    this.log(this)

    // Start main loop
    let lastNow = Date.now() / 1000
    this.state.loopInterval = setInterval(() => {
      const now = Date.now() / 1000

      this.tick(now - lastNow)

      lastNow = now
    }, (1 / this.config.maxFps) * 1000)
  }

  tick(delta) {
    this.state.lifetime += delta
    this.state.deltas++
    this.state.deltaCounter += delta

    const fixedTickAmount = Math.floor(
      this.state.deltaCounter / this.fixedDelta
    )

    if (this.renderer) this.emit('render')
    this.emit('beforeUpdate', delta)
    this.emit('update', delta)
    this.emit('afterUpdate', delta)

    this.fixedTick(fixedTickAmount)

    this.state.deltaCounter %= this.fixedDelta
  }

  fixedTick(amount) {
    for (let i = 0; i < amount; i++) {
      this.state.fixeds++
      this.emit('beforeFixedUpdate')
      this.emit('fixedUpdate')
      this.emit('afterFixedUpdate')
    }
  }

  /**
   * Return Template with 'extends' computed, if necessary
   * @param {Template} template
   */
  getFullTemplate(template) {
    if (template.extends) {
      return this.mergeTemplate(template, template.extends)
    }

    return template
  }

  /**
   * Merge Template with given extension
   * @param {Template} template
   * @param {Template} extension
   */
  mergeTemplate(template, extension) {
    if (template.extends == extension) {
      template.extends = null
    }

    if (typeof extension === 'string') {
      extension = this.findTemplate(extension)
    }

    return _.merge(_.cloneDeep(extension), template)
  }

  /**
   * Find and return full Template from database or built-in Templates with given Template name
   * @param {string} name
   */
  findTemplate(name) {
    if (this.strictlyObject(name)) return this.getFullTemplate(name)

    let template = null

    this.database.templates.forEach(configTemplate => {
      if (name == configTemplate.name) {
        template = this.getFullTemplate(configTemplate)
      }
    })

    return template
  }

  /**
   * Whether item is an Object and not an Array
   * @param {any} item
   */
  strictlyObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item)
  }

  /**
   * Return Promise that waits given amount of frames with fixedUpdate, then resolves
   * @param {number} frames
   */
  wait(frames) {
    return new Promise(resolve => {
      const now = Date.now()
      let counter = 0

      on(this, 'fixedUpdate', () => {
        if (counter >= frames) resolve(Date.now() - now)
        else counter++
      })
    })
  }

  error(message) {
    this.config.debug.error(message)
  }

  log(message) {
    this.config.debug.log(message)
  }

  warn(message) {
    this.config.debug.warn(message)
  }
}

export default Engine
