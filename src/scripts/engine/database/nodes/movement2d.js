export default {
  name: 'movement2d',
  vars: {
    speed: 5,
    smoothing: 30,
    input: {
      left: 0,
      right: 0,
      up: 0,
      down: 0,
    },
    velocity: {
      x: 0,
      y: 0,
    },
  },
  update(delta) {
    const smoothing = this.smoothing
    const input = this.input
    const velocity = this.velocity
    const position = this.gameObject.state.position
    const setState = this.gameObject.components.stateMachine.setState

    this.direction = {
      x: input.right - input.left,
      y: input.down - input.up,
    }

    const x = this.direction.x
    const y = this.direction.y

    setState('main', y != 0 || x != 0 ? 'walk' : 'idle')

    if (y != 0 && x == 0) {
      setState('direction', y > 0 ? 'down' : 'up')
    } else if (x != 0) {
      setState('direction', x > 0 ? 'right' : 'left')
    }

    velocity.x += smoothing * delta * (this.direction.x - velocity.x)
    velocity.y += smoothing * delta * (this.direction.y - velocity.y)

    position.x += delta * velocity.x * this.speed
    position.y += delta * velocity.y * this.speed
  },
}
