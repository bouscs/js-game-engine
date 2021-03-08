import '@babel/polyfill'
import engineConfig from './game/engineConfig'
import Engine from './engine/Engine'

const engine = new Engine(engineConfig)

engine.on('ready', () => engine.start())
