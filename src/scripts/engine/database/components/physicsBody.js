export default {
  name: 'physicsBody',
  bodyType: 'rectangle',
  bodyOptions: {
    mass: 1,
    friction: 0,
    frictionAir: 0.5,
    frictionStatic: 0.5,
    inertia: Infinity,
    restitution: 0,
  },
  size: {
    x: 1,
    y: 1,
  },
  init() {
    Object.assign(this.bodyOptions, this.template.bodyOptions)

    const state = this.gameObject.state
    this.body = this.ctx.physics.add[this.bodyType](
      state.position.x,
      state.position.y,
      this.size.x,
      this.size.y,
      this.bodyOptions
    )

    state.position = this.body.position
    state.rotation = this.body.angle
    state.body = this.body
  },
}
