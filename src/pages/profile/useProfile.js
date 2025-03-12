import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { fetchProfile } from '../../store/thunks'

const useProfile = () => {
  const isLoading = useSelector(state => state.user.isLoading)
  const author = useSelector(state => state.author.name)
  const quote = useSelector(state => state.quote.quote)

  const [name, setName] = useState('')
  const [token, settoken] = useState('')
  const [isShowModal, setIsShowModal] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/signin')
      return
    }
    settoken(token)

    dispatch(fetchProfile(token)).then(response => {
      if (response) {
        setName(response.data.fullname.split(' ')[0])
      }
    })
  }, [dispatch, navigate])

  const handleModal = (isRequestPassed = false) => {
    if (isRequestPassed === true) {
      setTimeout(() => setIsShowModal(false), 3000)
      return
    }
    if (isRequestPassed === false) {
      setIsShowModal(false)
      return
    }
    setIsShowModal(true)
  }
  return { handleModal, isShowModal, author, quote, name, token, isLoading }
}

export default useProfile
