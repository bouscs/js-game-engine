export default {
  name: 'sequencer',
  init() {
    Object.keys(this.sequences).forEach(type => {
      Object.keys(this.sequences[type]).forEach(sequence => {
        this.sequences[type][sequence].counter = 0
        this.sequences[type][sequence].current = 0
      })
    })
  },
  play(type, sequence) {
    const seq = _.merge({}, this.sequences[type][sequence])

    if (!seq.resetOnPlay === false) seq.current = 0
    seq.counter = -1

    this.state[type] = seq
  },
  stop(type) {
    this.state[type] = null
  },
  update() {
    Object.keys(this.state).forEach(type => {
      if (this.state[type] != null) {
        const seq = this.state[type]

        if (seq.counter > seq.stepDuration || seq.counter < 0) {
          seq.counter = 0

          if (seq.frames && seq.frames.length > 0) {
            seq.current++
            if (seq.current >= seq.frames.length) seq.current = 0
            seq.step.apply(this.gameObject, [
              seq.current,
              seq.frames[seq.current],
            ])
          } else {
            seq.step.apply(this.gameObject, [seq.current])
          }
        }
      }
    })
  },
  fixedUpdate() {
    Object.keys(this.state).forEach(type => {
      if (this.state[type] != null) {
        const seq = this.state[type]

        seq.counter++
      }
    })
  },
}
