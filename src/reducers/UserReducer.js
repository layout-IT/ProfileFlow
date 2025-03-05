const initialState = {
  isAutorized: false,
  isLoading: false,
}

const actionTypes = {
  IS_LOADING: 'IS_LOADING',
  AUTORIZED: 'AUTORIZED',
}

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.IS_LOADING:
      return { ...state, isLoading: action.payload }
    case actionTypes.AUTORIZED:
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
