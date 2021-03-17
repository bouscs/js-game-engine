import EventEmitter from 'events'

export default function (ctx) {
  const o = Object.create(new EventEmitter())

  o.name = 'gameObject1'

  ctx.on('start', () => {
    ctx.log('start!', o)
  })

  return o
}
