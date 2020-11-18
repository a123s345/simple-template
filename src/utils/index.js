export const copyPropertiesIgnoreNull = function (target, ...sources) {
  if (!target) return null
  if (!sources) return null
  sources.forEach(source => {
    Object.keys(target).forEach(key => {
      if (source[key] != null) {
        target[key] = source[key]
      }
    })
  })
  return target
}

export const formatter = function (array, value, valueLabel = 'value', textLabel = 'label', nullValue = null) {
  if (!(array instanceof Array)) {
    throw Error(`params:【${array}】 is not a Array`)
  }
  const one = array.find(item => item[value] === value)
  return one ? one[textLabel] : nullValue
}
