export default {
  name: 'stateMachine',
  startState: 'default',
  states: {
    main: {
      default: {
        trigger() {},
        enter() {},
        update() {},
        exit() {},
      },
    },
  },
  init() {
    Object.keys(this.states).forEach(type => {
      this.state[type] = {}
    })

    const changeState = (type, name) => {
      if (this.state[type].update)
        this.ctx.off('update', this.state[type].update)
      if (this.state[type].exit) this.state[type].exit()

      this.state[type] = {}
      const state = this.state[type]
      state.current = name

      const stateConfig = this.states[type][name]

      if (stateConfig.enter) {
        state.enter = stateConfig.enter.bind(this.gameObject)
      }

      if (stateConfig.update) {
        state.update = stateConfig.update.bind(this.gameObject)
        this.ctx.on('update', state.update)
      }

      if (stateConfig.exit) {
        state.exit = stateConfig.exit.bind(this.gameObject)
      }

      if (state.enter) state.enter()
    }

    this.setState = (type, name) => {
      if (this.state[type].current == name) return

      changeState(type, name)
    }

    this.resetState = type => {
      changeState(type, this.state[type].current)
    }
  },
  start() {
    Object.keys(this.state).forEach(type => {
      this.setState(type, this.states[type].startState)
    })
  },
  update() {
    Object.keys(this.states).forEach(type => {
      Object.keys(this.states[type]).forEach(stateName => {
        const stateConfig = this.states[type][stateName]

        if (
          stateConfig.trigger &&
          stateConfig.trigger.bind(this.gameObject)() === true
        ) {
          this.setState(type, stateName)
        }
      })
    })
  },
}
