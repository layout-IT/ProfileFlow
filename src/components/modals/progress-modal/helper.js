import { fetchAuthor, fetchQuote } from '../../../api/apiHelper'
import {
  setAuthorId,
  setAuthorName,
} from '../../../store/reducers/AuthorReducer'
import { setQuote, setQuoteId } from '../../../store/reducers/QuoteReducer'

export const fetchAuthorAndQuote = (
  setAuthor,
  dispatch,
  setTimer,
  setAuthorQuote
) => {
  const token = localStorage.getItem('token')
  let timerId

  new Promise((resolve, reject) => {
    timerId = setTimeout(async () => {
      try {
        const response = await fetchAuthor(token)
        if (!response) {
          reject('Ошибка запроса автора')
          return
        }

        const { authorId, name } = response.data

        if (response?.data) {
          setAuthor(name)
          dispatch(setAuthorId(authorId))
          dispatch(setAuthorName(name))
          resolve(authorId)
        } else {
          throw new Error('Ошибка: нет данных от Api')
        }
      } catch (error) {
        reject(error)
      }
    }, 2000)

    setTimer(timerId)
  })
    .then(authorId => {
      timerId = setTimeout(async () => {
        try {
          const result = await fetchQuote(authorId, token)

          if (result?.data) {
            const { quoteId, quote } = result.data
            setAuthorQuote(quote)
            dispatch(setQuote(quote))
            dispatch(setQuoteId(quoteId))
            setTimer(null)
          } else {
            throw new Error('Ошибка: нет данных от Api')
          }
        } catch (error) {
          console.error(error)
        }
      }, 2000)

      setTimer(timerId)
    })
    .catch(error => console.error('Ошибка в цепочке промисов:', error))
}
