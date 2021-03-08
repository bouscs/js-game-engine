export default {
  sequences: {
    walk: {
      down: {
        resetOnPlay: true,
        stepDuration: 6,
        frames: new Array(4),
        step(frame) {
          this.components.spriteRenderer.image = 'alba.walk.down' + frame
        },
      },
      left: {
        resetOnPlay: true,
        stepDuration: 6,
        frames: new Array(4),
        step(frame) {
          this.components.spriteRenderer.image = 'alba.walk.left' + frame
        },
      },
      up: {
        resetOnPlay: true,
        stepDuration: 6,
        frames: new Array(4),
        step(frame) {
          this.components.spriteRenderer.image = 'alba.walk.up' + frame
        },
      },
      right: {
        resetOnPlay: true,
        stepDuration: 6,
        frames: new Array(4),
        step(frame) {
          this.components.spriteRenderer.image = 'alba.walk.right' + frame
        },
      },
    },
  },
}
