import playerSequencer from './player.sequencer'
import playerStateMachine from './player.stateMachine'
import playerListen from './player.listen'

export default {
  name: 'player',
  store: {
    size: {
      x: 1,
      y: 1,
    },
    inputs: [],
    direction: 'down',
  },
  methods: {
    addInput(input) {
      this.state.inputs.push(input)
    },
    removeInput(input) {
      _.remove(this.state.inputs, existing => existing === input)
    },
  },
  beforeUpdate() {
    const input = this.components.physicsMovement2d.input

    const x = input.right - input.left
    const y = input.down - input.up

    if (this.state.inputs.length > 0)
      this.state.direction = _.last(this.state.inputs)

    if (y != 0 || x != 0) {
      this.components.stateMachine.setState('main', 'walk')
    } else {
      this.components.stateMachine.setState('main', 'idle')
    }
  },
  refs() {
    return {
      size: this.state.size,
    }
  },
  listen: playerListen,
  components: [
    {
      base: 'sequencer',
      template: playerSequencer,
    },
    {
      base: 'spriteRenderer',
      template: {
        image: 'player',
        size: {
          x: 4,
          y: 4,
        },
        offset: {
          x: 0,
          y: -0.1875,
        },
      },
    },
    {
      base: 'physicsMovement2d',
      template: {
        speed: 1.7,
      },
    },
    {
      base: 'stateMachine',
      template: playerStateMachine,
    },
    {
      base: 'physicsBody',
      template: {
        size: {
          x: 0.8,
          y: 1.6,
        },
      },
    },
  ],
}
