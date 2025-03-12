import {
  delayOfPtomise,
  fetchAuthor,
  fetchQuote,
  getProfile,
  makeRequest,
} from '../api/apiHelper'
import { setAuthorId, setAuthorName } from './reducers/AuthorReducer'
import { setQuote, setQuoteId } from './reducers/QuoteReducer'
import { setIsAutorized, setIsLoading } from './reducers/UserReducer'

export const logoutUser = () => async dispatch => {
  try {
    dispatch(setIsLoading(true))
    dispatch(setIsAutorized(false))
    const token = localStorage.getItem('token')
    await delayOfPtomise()
    await makeRequest(token)
  } catch (err) {
    console.error(err)
  }
}

export const fetchProfile = token => async dispatch => {
  try {
    dispatch(setIsLoading(true))
    await delayOfPtomise()
    const response = await getProfile(token)
    return response
  } catch (error) {
    console.error(error)
  } finally {
    dispatch(setIsLoading(false))
  }
}

export const fetchQuoteAndAuthor =
  (setTimer, setAuthorQuote, setAuthor) => async dispatch => {
    const token = localStorage.getItem('token')

    try {
      dispatch(setIsLoading(true))

      await delayOfPtomise()
      const response = await fetchAuthor(token)

      if (!response?.data) {
        throw new Error('Ошибка запроса автора')
      }

      const { authorId, name } = response.data
      setAuthor(name)
      dispatch(setAuthorId(authorId))
      dispatch(setAuthorName(name))

      await delayOfPtomise()
      const result = await fetchQuote(authorId, token)

      if (!result?.data) {
        throw new Error('Ошибка запроса цитаты')
      }

      const { quoteId, quote } = result.data
      setAuthorQuote(quote)
      dispatch(setQuote(quote))
      dispatch(setQuoteId(quoteId))

      setTimer(null)
    } catch (error) {
      console.error('Ошибка в fetchQuoteAndAuthor:', error)
    } finally {
      dispatch(setIsLoading(false))
    }
  }
