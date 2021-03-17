export default ctx => {
  ctx.debug = {
    log: console.log,
    err: console.error,
    warn: console.warn,
    info: console.info,
  }
}
