import createReducer from './createReducer'
import {
  ADD_ENTITIES,
  LOAD_ENTITY,
  LOAD_ENTITY_SUCCESS,
  LOAD_ENTITY_FAILURE,
  UPDATE_ENTITY,
  UPDATE_ENTITY_SUCCESS,
  UPDATE_ENTITY_FAILURE,
  DEL_ENTITY,
  DEL_ENTITY_SUCCESS,
  DEL_ENTITY_FAILURE,
  INSERT_ENTITY,
  INSERT_ENTITY_SUCCESS,
  INSERT_ENTITY_FAILURE
} from './actions'

const addEntitiesByKey = (state = {}, key, entities) => {
  const nextState = Object.keys(entities).reduce((result, id) => {
    result.entities[id] = entities[id]
    result.fetchStatus[id] = 'loaded'
    return result
  }, {entities: {}, fetchStatus: {}, errors: {}})
  return {
    entities: {...state.entities, ...nextState.entities},
    errors: {...state.errors, ...nextState.errors},
    fetchStatus: {...state.fetchStatus, ...nextState.fetchStatus}
  }
}

const addEntities = (state, {payload}) => {
  return Object.keys(payload).reduce((result, key) => {
    result = {
      ...result,
      [key]: addEntitiesByKey(result[key], key, payload[key])
    }
    return result
  }, state)
}

// getKey
const getKey = (entity) => {
  return typeof entity === 'object' ? entity.key : entity
}

// 更新单个实体的数据
const setDataByEntity = (state, entity, id, data) => {
  const key = getKey(entity)
  return {
    ...state,
    [key]: {
      ...state[key],
      entities: {
        ...state[key].entities,
        [id]: {
          ...state[key].entities[id],
          ...data
        }
      }
    }
  }
}

// 设置单个实体的错误
const setErrorsByEntity = (state, entity, id, error) => {
  const key = getKey(entity)
  let errors = state[key].errors
  if (error) {
    errors[id] = error
  } else {
    delete errors[id]
  }

  return {
    ...state,
    [key]: {
      ...state[key],
      errors: {...errors}
    }
  }
}

// 更新单个实体的状态
const setStatusByEntity = (state, entity, id, status) => {
  const key = getKey(entity)
  return {
    ...state,
    [key]: {
      ...state[key],
      fetchStatus: {
        ...state[key].fetchStatus,
        [id]: status
      }
    }
  }
}

// 删除单个实体的数据, 错误，状态
const deleteDataByEntity = (state, entity, id) => {
  const key = getKey(entity)
  const {entities, errors, fetchStatus} = state[key]

  delete entities[id]
  delete errors[id]
  delete fetchStatus[id]

  return {
    ...state,
    [key]: {
      ...state[key],
      entities: {...entities},
      errors: {...errors},
      fetchStatus: {...fetchStatus}
    }
  }
}

export default (initialState) => createReducer(initialState, {
  [ADD_ENTITIES]: addEntities,

  // load
  [LOAD_ENTITY]: (state, {entity, id}) => {
    let nextState = setErrorsByEntity(state, entity, id)
    return setStatusByEntity(nextState, entity, id, true)
  },
  [LOAD_ENTITY_SUCCESS]: (state, {entity, id, payload}) => {
    let nextState = setDataByEntity(state, entity, id, payload)
    return setStatusByEntity(nextState, entity, id, false)
  },
  [LOAD_ENTITY_FAILURE]: (state, {entity, id, payload}) => {
    let nextState = setErrorsByEntity(state, entity, id, payload)
    return setStatusByEntity(nextState, entity, id, false)
  },

  // update
  [UPDATE_ENTITY]: (state, {entity, id}) => {
    let nextState = setErrorsByEntity(state, entity, id)
    return setStatusByEntity(nextState, entity, id, true)
  },
  [UPDATE_ENTITY_SUCCESS]: (state, {entity, id, payload}) => {
    let nextState = setDataByEntity(state, entity, id, payload)
    return setStatusByEntity(nextState, entity, id, false)
  },
  [UPDATE_ENTITY_FAILURE]: (state, {entity, id, payload}) => {
    let nextState = setErrorsByEntity(state, entity, id, payload)
    return setStatusByEntity(nextState, entity, id, false)
  },

  // del
  [DEL_ENTITY]: (state, {entity, id = 'delete'}) => {
    let nextState = setErrorsByEntity(state, entity, id)
    return setStatusByEntity(nextState, entity, id, true)
  },
  [DEL_ENTITY_SUCCESS]: (state, {entity, id = 'delete'}) => {
    return deleteDataByEntity(state, entity, id)
  },
  [DEL_ENTITY_FAILURE]: (state, {entity, id = 'delete', payload}) => {
    let nextState = setErrorsByEntity(state, entity, id, payload)
    return setStatusByEntity(nextState, entity, id, false)
  },

  // insert
  [INSERT_ENTITY]: (state, {entity, id = 'insert'}) => {
    let nextState = setErrorsByEntity(state, entity, id)
    return setStatusByEntity(nextState, entity, id, true)
  },
  [INSERT_ENTITY_SUCCESS]: (state, {entity, id = 'insert', payload}) => {
    let nextState = state
    if (id === 'insert') {
      nextState = deleteDataByEntity(nextState, entity, id)
    }
    nextState = setDataByEntity(nextState, entity, id, payload)
    return setStatusByEntity(nextState, entity, id, false)
  },
  [INSERT_ENTITY_FAILURE]: (state, {entity, id = 'delete', payload}) => {
    let nextState = setErrorsByEntity(state, entity, id, payload)
    return setStatusByEntity(nextState, entity, id, false)
  }
})
