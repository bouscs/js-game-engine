import propFor from '../../../../engine/propFor'

export default {
  sequences: {
    walk: propFor(
      {
        down: ['down'],
        left: ['left'],
        up: ['up'],
        right: ['right'],
      },
      data => {
        return {
          resetOnPlay: true,
          stepDuration: 5,
          frames: [1, 2, 3, 0],
          step(frame) {
            this.components.spriteRenderer.image =
              'alba.walk.' + data[0] + frame
          },
        }
      }
    ),
    walkk: {
      down: {
        resetOnPlay: true,
        stepDuration: 5,
        frames: [1, 2, 3, 0],
        step(frame) {
          this.components.spriteRenderer.image = 'alba.walk.down' + frame
        },
      },
      left: {
        resetOnPlay: true,
        stepDuration: 5,
        frames: [1, 2, 3, 0],
        step(frame) {
          this.components.spriteRenderer.image = 'alba.walk.left' + frame
        },
      },
      up: {
        resetOnPlay: true,
        stepDuration: 5,
        frames: [1, 2, 3, 0],
        step(frame) {
          this.components.spriteRenderer.image = 'alba.walk.up' + frame
        },
      },
      right: {
        resetOnPlay: true,
        stepDuration: 5,
        frames: [1, 2, 3, 0],
        step(frame) {
          this.components.spriteRenderer.image = 'alba.walk.right' + frame
        },
      },
    },
  },
}
