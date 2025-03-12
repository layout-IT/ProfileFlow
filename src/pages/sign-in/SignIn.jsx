import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import ModalError from './modal-error/modalError'
import { Api } from '../../api/Api'
import Form from '../../components/form/Form'
import Preloader from '../../components/preloader/Preloader'
import { setIsAutorized, setIsLoading } from '../../store/reducers/UserReducer'
const SignIn = () => {
  const isLoading = useSelector(state => state.user.isLoading)
  const [isTokenChecked, setIsTokenChecked] = useState(false)
  const [errorText, setErrorText] = useState('')

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
      const response = await Api.post('/login', data)
      const token = response?.data?.token
      localStorage.setItem('token', token)
      dispatch(setIsAutorized(true))
      navigate('/profile')
    } catch (err) {
      setErrorText(err)
      console.error(err)
    }
  }

  const renderData = () => {
    console.log({ errorText, isLoading, isTokenChecked })

    if (isLoading) {
      return errorText ? (
        <>
          <ModalError text={errorText} setErrorText={setErrorText} />
          <Form onSubmit={onSubmit} />
        </>
      ) : (
        <Preloader />
      )
    } else if (!isTokenChecked) {
      return <Preloader />
    } else {
      return <Form onSubmit={onSubmit} />
    }
  }

  return <>{renderData()}</>
}

export default SignIn
