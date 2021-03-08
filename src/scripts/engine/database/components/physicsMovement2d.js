import equal from 'deep-equal'

export default {
  name: 'physicsMovement2d',
  speed: 3,
  input: {
    left: 0,
    right: 0,
    up: 0,
    down: 0,
  },
  lastInput: {},
  direction: {
    x: 0,
    y: 0,
  },
  fixedUpdate() {
    if (!equal(this.lastInput, this.input))
      this.emit('inputChanged', this.input)

    const input = this.input

    this.direction = {
      x: input.right - input.left,
      y: input.down - input.up,
    }

    this.ctx.physics.body.applyForce(
      this.gameObject.state.body,
      this.gameObject.state.position,
      {
        x: this.direction.x * this.ctx.physics.scaleFactor * this.speed,
        y: this.direction.y * this.ctx.physics.scaleFactor * this.speed,
      }
    )

    this.lastInput = _.merge(this.lastInput, this.input)
  },
}
