import scene1 from './scenes/scene1'
import gameObjects from './gameObjects'
import tilesets from './tilesets'
import images from './images'

export default {
  meta: {
    name: 'Zelda 3',
  },
  scenes: [scene1],
  templates: [...gameObjects],
  tilesets,
  images,
}
