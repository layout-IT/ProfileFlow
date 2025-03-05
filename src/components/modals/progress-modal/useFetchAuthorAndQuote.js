import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { API } from '../../../api/API'
import { setAuthorId, setAuthorName } from '../../../reducers/AuthorReducer'
import { setQuote, setQuoteId } from '../../../reducers/QuoteReducer'

const useFetchAuthorAndQuote = () => {
  const dispatch = useDispatch()
  const [author, setAuthor] = useState('')
  const [authorQuote, setAuthorQuote] = useState('')
  const [isRequestPassed, setIsRequestPassed] = useState(false)
  const [timer, setTimer] = useState(null)

  const fetchAuthorAndQuote = () => {
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
            throw new Error('Ошибка: нет данных от API')
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
              throw new Error('Ошибка: нет данных от API')
            }
          } catch (error) {
            console.error(error)
          }
        }, 2000)

        setTimer(timerId)
      })
      .catch(error => console.error('Ошибка в цепочке промисов:', error))
  }

  useEffect(() => {
    fetchAuthorAndQuote()
  }, [])
  return {
    isRequestPassed,
    author,
    authorQuote,
    timer,
    setTimer,
    setIsRequestPassed,
  }
}

export default useFetchAuthorAndQuote

const fetchAuthor = async token => {
  try {
    return await API.get('/author', { token })
  } catch (error) {
    console.error(error)
  }
}

const fetchQuote = async (authorId, token) => {
  try {
    return await API.get('/quote', { token, authorId })
  } catch (error) {
    console.error(error)
  }
}
