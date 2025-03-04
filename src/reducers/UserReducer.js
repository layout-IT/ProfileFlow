const initialState = {
  isAutorized: false,
  isLoading: false,
}

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'IS_LOADING':
      return { ...state, isLoading: action.payload }
    case 'AUTORIZED':
      return { ...state, isAutorized: action.payload }
    default:
      return state
  }
}

export default UserReducer

export const setIsLoading = isLoading => ({
  type: 'IS_LOADING',
  payload: isLoading,
})
export const setIsAutorized = bool => ({ type: 'AUTORIZED', payload: bool })
