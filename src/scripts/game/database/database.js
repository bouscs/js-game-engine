import scene1 from './scenes/scene1'
import gameObjects from './gameObjects'
import tilesets from './tilesets'
import images from './images'
import nodes from './nodes'
import sceneNodes from './scenes/sceneNodes'

export default {
  meta: {
    name: 'Zelda 3',
  },
  scenes: [scene1, sceneNodes],
  templates: [...gameObjects, ...nodes],
  tilesets,
  images,
}
