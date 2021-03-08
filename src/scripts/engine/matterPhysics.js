import { Body, Engine, World, Bodies } from 'matter-js'

export default engine => {
  const matterEngine = Engine.create()
  matterEngine.world.gravity.scale = 1
  matterEngine.world.gravity.y = 0
  engine.on('fixedUpdate', () =>
    Engine.update(matterEngine, engine.fixedDelta * 1000)
  )

  engine.physics = {
    scaleFactor: 0.0001,
    engine: matterEngine,
    world: World,
    bodies: Bodies,
    body: Body,
    add: {
      rectangle(x, y, width, height, options = null) {
        const body = Bodies.rectangle(x, y, width, height, options)

        World.add(matterEngine.world, body)

        return body
      },
    },
  }

  engine.emit('physicsReady')
}
