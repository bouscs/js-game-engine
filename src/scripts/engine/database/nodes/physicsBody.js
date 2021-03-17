export default {
  name: 'physicsBodyNode',
  use: ['transform'],
  vars: {
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
  },
  setup(ctx) {
    this.body = ctx.physics.add[this.bodyType](
      this.position.x,
      this.position.y,
      this.size.x,
      this.size.y,
      this.bodyOptions
    )

    this.position = this.body.position
    this.rotation = this.body.angle
  },
}
