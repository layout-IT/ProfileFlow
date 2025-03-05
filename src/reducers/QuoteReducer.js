const initialState = {
  quote: '',
  id: null,
}

const actionTypes = {
  QUOTE: 'QUOTE',
  QOTE_ID: 'QOTE_ID',
  CLEAN_UP: 'CLEAN_UP',
}

const QuoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.QUOTE:
      return { ...state, quote: action.payload }
    case actionTypes.QOTE_ID:
      return { ...state, id: action.payload }
    case actionTypes.CLEAN_UP:
      return { ...state, quote: '', id: null }
    default:
      return state
  }
}

export default QuoteReducer

export const setQuote = quote => ({
  type: 'QUOTE',
  payload: quote,
})
export const setQuoteId = id => ({ type: 'QOTE_ID', payload: id })
export const setCleanUp = () => ({ type: 'CLEAN_UP' })
