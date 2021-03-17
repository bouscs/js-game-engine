export default {
  name: 'stateMachine',
  vars: {
    state: {},
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
  },
  setup(ctx) {
    Object.keys(this.states).forEach(type => {
      this.state[type] = {}
    })

    const changeState = (type, name) => {
      if (this.state[type].update) ctx.off('update', this.state[type].update)
      if (this.state[type].fixedUpdate)
        ctx.off('fixedUpdate', this.state[type].fixedUpdate)
      if (this.state[type].beforeFixedUpdate)
        ctx.off('beforeFixedUpdate', this.state[type].beforeFixedUpdate)
      if (this.state[type].afterFixedUpdate)
        ctx.off('afterFixedUpdate', this.state[type].afterFixedUpdate)
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
        ctx.on('update', state.update)
      }

      if (stateConfig.fixedUpdate) {
        state.fixedUpdate = stateConfig.fixedUpdate.bind(this.gameObject)
        ctx.on('fixedUpdate', state.fixedUpdate)
      }

      if (stateConfig.beforeFixedUpdate) {
        state.beforeFixedUpdate = stateConfig.beforeFixedUpdate.bind(
          this.gameObject
        )
        ctx.on('beforeFixedUpdate', state.beforeFixedUpdate)
      }

      if (stateConfig.afterFixedUpdate) {
        state.afterFixedUpdate = stateConfig.afterFixedUpdate.bind(
          this.gameObject
        )
        ctx.on('afterFixedUpdate', state.afterFixedUpdate)
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

    ctx.on('start', () => {
      Object.keys(this.state).forEach(type => {
        this.setState(type, this.states[type].startState)
      })
    })

    ctx.on('update', () => {
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
    })
  },
}
