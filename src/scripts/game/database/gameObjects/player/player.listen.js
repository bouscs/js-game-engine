export default {
  ctx: {
    keyDown(event) {
      const input = this.components.physicsMovement2d.input

      if (event.key == 'ArrowLeft') {
        input.left = 1
        this.addInput('left')
      } else if (event.key == 'ArrowRight') {
        input.right = 1
        this.addInput('right')
      } else if (event.key == 'ArrowUp') {
        input.up = 1
        this.addInput('up')
      } else if (event.key == 'ArrowDown') {
        input.down = 1
        this.addInput('down')
      }
    },
    keyUp(event) {
      const input = this.components.physicsMovement2d.input

      if (event.key == 'ArrowLeft') {
        input.left = 0
        this.removeInput('left')
      } else if (event.key == 'ArrowRight') {
        input.right = 0
        this.removeInput('right')
      } else if (event.key == 'ArrowUp') {
        input.up = 0
        this.removeInput('up')
      } else if (event.key == 'ArrowDown') {
        input.down = 0
        this.removeInput('down')
      }
    },
  },
}
