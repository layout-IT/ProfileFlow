const initialState = {
  quote: '',
  id: null,
}

const QuoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'QUOTE':
      return { ...state, quote: action.payload }
    case 'QOTE_ID':
      return { ...state, id: action.payload }
    case 'CLEAN_UP':
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
