export const on = (emitter, event, callback) => {
  emitter.on(event, callback)
}

export const off = (emitter, event, callback) => {
  emitter.off(event, callback)
}

export const once = (emitter, event, callback) => {
  emitter.once(event, callback)
}
