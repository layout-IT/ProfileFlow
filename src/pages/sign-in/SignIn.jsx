import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { API } from '../../api/API'
import Form from '../../components/form/Form'
import Preloader from '../../components/preloader/Preloader'
import { setIsAutorized, setIsLoading } from '../../reducers/UserReducer'
const SignIn = () => {
  const isLoading = useSelector(state => state.user.isLoading)
  const [isTokenChecked, setIsTokenChecked] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/profile')
      return
    }
    setIsTokenChecked(true)
  })

  const onSubmit = async data => {
    try {
      dispatch(setIsLoading(true))
      await new Promise(resolve => setTimeout(resolve, 2000))
      const response = await API.post('/login', data)
      const token = response?.data?.token
      localStorage.setItem('token', token)
      dispatch(setIsAutorized(true))
      navigate('/profile')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      {isLoading || !isTokenChecked ? (
        <Preloader />
      ) : (
        <Form onSubmit={onSubmit} />
      )}
    </>
  )
}

export default SignIn
