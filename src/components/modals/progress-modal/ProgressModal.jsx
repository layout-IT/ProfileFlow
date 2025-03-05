import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import * as style from './ProgressModal.module.scss'
import { API } from '../../../api/API'
import { PROGRESS_MODAL_TEXT } from '../../../constants'
import { setAuthorId, setAuthorName } from '../../../reducers/AuthorReducer'
import { setQuote, setQuoteId } from '../../../reducers/QuoteReducer'

const ProgressModal = ({ handleModal }) => {
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

  const handleClick = () => {
    if (timer) {
      clearTimeout(timer)
      setTimer(null)
      setIsRequestPassed(true)
      handleModal(true)
    } else {
      handleModal(false)
    }
  }
  return (
    <div className={style.wrapper}>
      <div className={style.items}>
        <h2 className={style.item}>Requestiong the quote</h2>
        <div className={style.item}>
          Step1: {PROGRESS_MODAL_TEXT.step1}...{' '}
          {!author ? 'Loading' : 'Completed'}{' '}
        </div>
        <div className={style.item}>
          Step2: {PROGRESS_MODAL_TEXT.step2}...
          {author && (!authorQuote ? 'Loading' : 'Completed')}
        </div>
        {isRequestPassed && (
          <div className={style.redText}>
            The request was cancelled. The modal will close in 3 seconds
          </div>
        )}
        <button
          disabled={isRequestPassed}
          onClick={() => handleClick()}
          className={`${style.button} ${isRequestPassed && style.disabled}`}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default ProgressModal

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
