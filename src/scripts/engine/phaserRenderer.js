import Phaser from 'phaser'

export default engine => {
  class MainScene extends Phaser.Scene {
    constructor() {
      super({ key: 'MainScene' })
    }

    preload() {
      Object.keys(engine.database.images).forEach(image => {
        this.load.image(image, 'assets/img/' + engine.database.images[image])
      })
    }

    create() {
      console.log(this)
      const keyboard = this.input.keyboard

      keyboard.on('keydown', event => engine.emit('keyDown', event))
      keyboard.on('keyup', event => engine.emit('keyUp', event))

      const resolutionUnits = {
        width: engine.config.resolution.width,
        height: engine.config.resolution.height,
      }

      const sizeToScale = ({ width, height }, size) => {
        return {
          x: size.x / width,
          y: size.y / height,
        }
      }

      engine.renderer = {
        ctx: engine,
        state: {},
        phaserScene: this,

        addImage(image) {
          const instance = this.phaserScene.add.sprite(0, 0, image)
          return instance
        },

        addText(text) {
          const instance = this.phaserScene.add.text(0, 0, text)
          return instance
        },

        addMainCamera() {
          const instance = this.phaserScene.cameras.main

          return instance
        },

        renderCamera() {
          const camera = this.state.rendererData
          const props = this.state

          camera.setZoom(resolutionUnits.width / props.width)
          camera.setScroll(
            props.position.x - resolutionUnits.width / 2,
            props.position.y - resolutionUnits.height / 2
          )
        },

        renderImage() {
          const image = this.state.rendererData
          const objProps = this.gameObject.state

          image.setPosition(
            objProps.position.x + 0.5 + this.offset.x,
            objProps.position.y + 0.5 + this.offset.y
          )
          image.setRotation(objProps.rotation)
          const scale = sizeToScale(image, this.size)
          image.setScale(scale.x, scale.y)

          if (image.texture.key != this.image) {
            image.setTexture(this.image)
          }
        },

        renderText() {
          const text = this.state.rendererData
          const objProps = this.gameObject.state

          text.setPosition(objProps.position.x + 0.5, objProps.position.y + 0.5)

          text.setRotation(objProps.rotation)
          const scale = sizeToScale(text, objProps.size)
          text.setScale(scale.x, scale.y)

          if (text.text != this.text) {
            text.text = this.text
          }
        },
      }

      engine.emit('rendererReady')
    }
  }

  window.addEventListener('load', () => {
    new Phaser.Game({
      type: Phaser.AUTO,
      backgroundColor: '#000',
      scale: {
        parent: 'game',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: engine.config.resolution.width,
        height: engine.config.resolution.height,
      },
      render: {
        roundPixels: true,
        antialias: false,
      },
      scene: [MainScene],
    })
  })
}
