export default {
  ctx: {
    keyDown(event) {
      const input = this.components.physicsMovement2d.input

      if (event.key == 'ArrowLeft') input.left = 1
      else if (event.key == 'ArrowRight') input.right = 1
      else if (event.key == 'ArrowUp') input.up = 1
      else if (event.key == 'ArrowDown') input.down = 1
    },
    keyUp(event) {
      const input = this.components.physicsMovement2d.input

      if (event.key == 'ArrowLeft') input.left = 0
      else if (event.key == 'ArrowRight') input.right = 0
      else if (event.key == 'ArrowUp') input.up = 0
      else if (event.key == 'ArrowDown') input.down = 0
    },
  },
}
