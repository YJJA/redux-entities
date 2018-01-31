export const ADD_ENTITIES = 'ADD_ENTITIES'

export const LOAD_ENTITY = 'LOAD_ENTITY'
export const LOAD_ENTITY_SUCCESS = 'LOAD_ENTITY_SUCCESS'
export const LOAD_ENTITY_FAILURE = 'LOAD_ENTITY_FAILURE'

export const UPDATE_ENTITY = 'UPDATE_ENTITY'
export const UPDATE_ENTITY_SUCCESS = 'UPDATE_ENTITY_SUCCESS'
export const UPDATE_ENTITY_FAILURE = 'UPDATE_ENTITY_FAILURE'

export const DEL_ENTITY = 'DEL_ENTITY'
export const DEL_ENTITY_SUCCESS = 'DEL_ENTITY_SUCCESS'
export const DEL_ENTITY_FAILURE = 'DEL_ENTITY_FAILURE'

export const INSERT_ENTITY = 'INSERT_ENTITY'
export const INSERT_ENTITY_SUCCESS = 'INSERT_ENTITY_SUCCESS'
export const INSERT_ENTITY_FAILURE = 'INSERT_ENTITY_FAILURE'

export const add = (payload) => ({
  type: ADD_ENTITIES,
  payload
})

// load
export const load = (entity, id) => ({
  type: LOAD_ENTITY,
  entity,
  id
})

export const loadSuccess = (entity, id, payload) => ({
  type: LOAD_ENTITY_SUCCESS,
  entity,
  id,
  payload
})

export const loadFailure = (entity, id, payload) => ({
  type: UPDATE_ENTITY_FAILURE,
  entity,
  id,
  payload
})

// update
export const update = (entity, id) => ({
  type: UPDATE_ENTITY,
  entity,
  id
})

export const updateSuccess = (entity, id, payload) => ({
  type: UPDATE_ENTITY_SUCCESS,
  entity,
  id,
  payload
})

export const updateFailure = (entity, id, payload) => ({
  type: LOAD_ENTITY_FAILURE,
  entity,
  id,
  payload
})

// del
export const del = (entity, id) => ({
  type: DEL_ENTITY,
  entity,
  id
})

export const delSuccess = (entity, id) => ({
  type: DEL_ENTITY_SUCCESS,
  entity,
  id
})

export const delFailure = (entity, id, payload) => ({
  type: DEL_ENTITY_FAILURE,
  entity,
  id,
  payload
})

// insert
export const insert = (entity) => ({
  type: INSERT_ENTITY,
  entity
})

export const insertSuccess = (entity, payload) => ({
  type: INSERT_ENTITY_SUCCESS,
  entity,
  payload
})

export const insertFailure = (entity, payload) => ({
  type: INSERT_ENTITY_FAILURE,
  entity,
  payload
})

export default {
  add,
  load,
  loadSuccess,
  loadFailure,
  update,
  updateSuccess,
  updateFailure,
  del,
  delSuccess,
  delFailure,
  insert,
  insertSuccess,
  insertFailure
}
