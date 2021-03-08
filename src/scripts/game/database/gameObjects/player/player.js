import playerSequencer from './player.sequencer'
import playerStateMachine from './player.stateMachine'
import playerListen from './player.listen'

export default {
  name: 'player',
  extends: ['character'],
  store: {
    size: {
      x: 1,
      y: 1,
    },
    inputs: [],
    direction: 'down',
  },
  update() {
    const input = this.components.physicsMovement2d.input

    const x = input.right - input.left
    const y = input.down - input.up

    if (y != 0 || x != 0) {
      if (x == 0) this.state.direction = y > 0 ? 'down' : 'up'
      else this.state.direction = x > 0 ? 'right' : 'left'

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
        speed: 2,
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
