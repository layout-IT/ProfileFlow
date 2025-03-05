import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { API } from '../../api/API'
import { setIsLoading } from '../../reducers/UserReducer'

const useProfile = () => {
  const isLoading = useSelector(state => state.user.isLoading)
  const author = useSelector(state => state.author.name)
  const quote = useSelector(state => state.quote.quote)

  const [name, setName] = useState('')
  const [token, settoken] = useState('')
  const [isShowModal, setIsShowModal] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const fetchProfile = async token => {
    try {
      dispatch(setIsLoading(true))
      await new Promise(resolve => setTimeout(resolve, 2000))
      const response = await API.get('/profile', { token })
      return response
    } catch (error) {
      console.error(error)
    } finally {
      dispatch(setIsLoading(false))
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/signin')
      return
    }
    settoken(token)

    fetchProfile(token).then(response => {
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
