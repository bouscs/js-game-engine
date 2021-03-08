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

    this.state[type] = seq
  },
  stop(type) {
    this.state[type] = null
  },
  fixedUpdate() {
    Object.keys(this.state).forEach(type => {
      if (this.state[type] != null) {
        const seq = this.state[type]

        seq.counter++

        if (seq.counter >= seq.stepDuration) {
          seq.counter = 0

          if (seq.frames && seq.frames.length > 0) {
            seq.current++
            if (seq.current >= seq.frames.length) seq.current = 0
            seq.step.bind(this.gameObject)(seq.current, seq.frames[seq.current])
          } else {
            seq.step.bind(this.gameObject)(seq.current)
          }
        }
      }
    })
  },
}
