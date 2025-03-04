import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { API } from '../../api/API'
import Form from '../../components/form/Form'
import Preloader from '../../components/preloader/Preloader'
import { setIsAutorized, setIsLoading } from '../../reducers/UserReducer'
const SignIn = () => {
  const isLoading = useSelector(state => state.user.isLoading)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async data => {
    try {
      dispatch(setIsLoading(true))
      const response = await API.post('/login', data)
      const token = response?.data?.token
      localStorage.setItem('token', token)
      dispatch(setIsAutorized(true))
      navigate('/profile')
    } catch (err) {
      console.error(err)
    }
  }

  return <>{isLoading ? <Preloader /> : <Form onSubmit={onSubmit} />}</>
}

export default SignIn
