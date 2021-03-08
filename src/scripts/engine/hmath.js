export default {
  lerp(start, end, t) {
    let distance = end - start
    distance *= t

    return start + distance
  },

  sin(x) {
    return Math.sin(x)
  },
}
