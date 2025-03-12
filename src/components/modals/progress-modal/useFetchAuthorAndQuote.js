import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { fetchAuthorAndQuote } from './helper'

const useFetchAuthorAndQuote = () => {
  const dispatch = useDispatch()
  const [author, setAuthor] = useState('')
  const [authorQuote, setAuthorQuote] = useState('')
  const [isRequestPassed, setIsRequestPassed] = useState(false)
  const [timer, setTimer] = useState(null)

  useEffect(() => {
    fetchAuthorAndQuote(setAuthor, dispatch, setTimer, setAuthorQuote)
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
