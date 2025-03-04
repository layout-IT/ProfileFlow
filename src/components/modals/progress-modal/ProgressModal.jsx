import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { API } from '../../../api/API'
import { PROGRESS_MODAL_TEXT } from '../../../constants'
import { setAuthorId, setAuthorName } from '../../../reducers/AuthorReducer'
import { setQuote, setQuoteId } from '../../../reducers/QuoteReducer'

import * as style from './ProgressModal.module.scss'

const ProgressModal = ({ isAbort, onClickHandler, signal }) => {
  const dispatch = useDispatch()
  const [author, setAuthor] = React.useState('')
  const [authorQuote, setAuthorQuote] = React.useState('')
  const [isRequestPassed, setIsRequestPassed] = React.useState(false)

  const fetchAuthor = async ({ token }) => {
    try {
      return await API.get('/author', { token, signal })
    } catch (error) {
      console.error(error)
    }
  }

  const fetchQuote = async ({ authorId, token }) => {
    try {
      return await API.get('/quote', { token, authorId, signal })
    } catch (error) {
      console.error(error)
    }
  }

  const fetchAuthorAndQuote = async () => {
    const token = localStorage.getItem('token')
    try {
      const response = await fetchAuthor({ token, signal })
      const { authorId, name } = response.data
      setAuthor(name)
      dispatch(setAuthorId(authorId))
      dispatch(setAuthorName(name))
      const result = await fetchQuote({ authorId, token, signal })
      const { quoteId, quote } = result.data
      setAuthorQuote(quote)
      dispatch(setQuote(quote))
      dispatch(setQuoteId(quoteId))
      setIsRequestPassed(true)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchAuthorAndQuote()
  }, [])

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
        {isAbort && (
          <div className={style.redText}>
            The request was cancelled. The modal will close in 3 seconds
          </div>
        )}
        <button
          onClick={() => onClickHandler(!isRequestPassed && 'abort')}
          className={style.button}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default ProgressModal
