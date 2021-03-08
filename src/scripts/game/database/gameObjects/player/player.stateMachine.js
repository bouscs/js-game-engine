export default {
  direction: 'down',
  states: {
    main: {
      startState: 'idle',
      idle: {
        enter() {
          this.components.spriteRenderer.image =
            'alba.walk.' + this.state.direction + '0'
        },
      },
      walk: {
        enter() {
          this.components.sequencer.play('walk', this.state.direction)
          this.components.stateMachine.direction = this.state.direction
        },
        update() {
          if (this.components.stateMachine.direction !== this.state.direction)
            this.components.sequencer.play('walk', this.state.direction)
          this.components.stateMachine.direction = this.state.direction
        },
        exit() {
          this.components.sequencer.stop('walk')
        },
      },
    },
  },
}
