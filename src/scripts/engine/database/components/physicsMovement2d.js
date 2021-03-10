import equal from 'deep-equal'
import { vec2 } from 'gl-matrix'

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

    const vec = [this.direction.x, this.direction.y]

    vec2.normalize(vec, vec)

    this.ctx.physics.body.applyForce(
      this.gameObject.state.body,
      this.gameObject.state.position,
      {
        x: vec[0] * this.ctx.physics.scaleFactor * this.speed,
        y: vec[1] * this.ctx.physics.scaleFactor * this.speed,
      }
    )

    this.lastInput = _.merge(this.lastInput, this.input)
  },
}
