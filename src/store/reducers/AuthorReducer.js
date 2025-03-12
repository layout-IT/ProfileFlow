const initialState = {
  name: '',
  id: null,
}

const actionTypes = {
  AUTHOR_NAME: 'AUTHOR_NAME',
  AUTHOR_ID: 'AUTHOR_ID',
  CLEAN_UP: 'CLEAN_UP',
}

const AuthorReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTHOR_NAME:
      return { ...state, name: action.payload }
    case actionTypes.AUTHOR_ID:
      return { ...state, id: action.payload }
    case actionTypes.CLEAN_UP:
      return { ...state, name: '', id: null }
    default:
      return state
  }
}

export default AuthorReducer

export const setAuthorName = name => ({
  type: 'AUTHOR_NAME',
  payload: name,
})
export const setAuthorId = id => ({ type: 'AUTHOR_ID', payload: id })
export const setCleanUp = () => ({ type: 'CLEAN_UP' })
