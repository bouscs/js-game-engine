export default {
  name: 'wall',
  components: [
    {
      base: 'spriteRenderer',
      template: {
        image: 'test',
        size: {
          x: 8,
          y: 1,
        },
      },
    },
    {
      base: 'physicsBody',
      template: {
        bodyOptions: {
          isStatic: true,
        },
        size: {
          x: 8,
          y: 1,
        },
      },
    },
  ],
}
