import 'core-js'
//import engineConfig from './game/engineConfig'
//import Engine from './engine/Engine'
import { createEngine } from './ayngin/GameEngine'
import { sceneManager, debug } from './ayngin/components'

//const engine = new Engine(engineConfig)

//engine.on('ready', () => engine.start())

const engine = createEngine()

engine.use(debug, sceneManager)

engine.start()

console.log(engine)
