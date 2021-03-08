const unnest = function (o) {
  const un = {}

  Object.keys(o).forEach(key => {
    if (typeof o[key] === 'string') {
      un[key] = o[key]
    } else {
      const unkey = unnest(o[key])

      Object.keys(unkey).forEach(ukey => {
        un[key + '.' + ukey] = unkey[ukey]
      })
    }
  })

  return un
}

export default unnest
