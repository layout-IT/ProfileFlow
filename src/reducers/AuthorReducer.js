const initialState = {
  name: '',
  id: null,
}
const AuthorReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTHOR_NAME':
      return { ...state, name: action.payload }
    case 'AUTHOR_ID':
      return { ...state, id: action.payload }
    case 'CLEAN_UP':
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
