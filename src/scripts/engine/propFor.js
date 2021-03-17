export default (propsData, makeProp) => {
  const o = {}

  Object.keys(propsData).forEach(data => {
    o[data] = makeProp(propsData[data])
  })

  return o
}
