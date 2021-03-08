import wall from './wall'

export default {
  name: 'fourWalls',
  children: [
    {
      name: 'wall1',
      extends: wall,
      store: {
        position: {
          x: -8,
          y: 0,
        },
        size: {
          x: 1,
          y: 8,
        },
      },
    },
    {
      name: 'wall2',
      extends: wall,
      store: {
        position: {
          x: 8,
          y: 0,
        },
        size: {
          x: 1,
          y: 8,
        },
      },
    },
    {
      name: 'wall3',
      extends: wall,
      store: {
        position: {
          x: 0,
          y: -4,
        },
        size: {
          x: 16,
          y: 1,
        },
      },
    },
    {
      name: 'wall4',
      extends: wall,
      store: {
        position: {
          x: 0,
          y: 4,
        },
        size: {
          x: 16,
          y: 1,
        },
      },
    },
  ],
}
