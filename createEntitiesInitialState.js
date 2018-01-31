
export default (schema) => {
  return Object.keys(schema).reduce((result, k) => {
    const key = schema[k].key
    result[key] = {
      entities: {},
      errors: {},
      fetchStatus: {}
    }
    return result
  }, {})
}
