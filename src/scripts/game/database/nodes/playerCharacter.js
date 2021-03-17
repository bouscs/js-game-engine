export default {
  name: 'playerCharacter',
  use: ['physicsBodyNode', 'spriteRendererNode'],
  setup(ctx) {
    ctx.log('jkdnlajsdnfaklsdn')

    ctx.log(ctx)

    this.testar(ctx)
  },
  vars: {
    image: 'player',
    teste: 1,
  },
  methods: {
    testar(ctx) {
      ctx.log('testando')
    },
  },
}
