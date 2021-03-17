export default ctx => {
  const scenes = {
    name: 'sceneManager',
  }

  ctx.on('start', () => {
    ctx.debug.log('start scenes')
  })

  ctx.scenes = scenes
}
