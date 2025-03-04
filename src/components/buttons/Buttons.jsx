import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Button from './button/Button'
import { API } from '../../api/API'
import { setCleanUp } from '../../reducers/AuthorReducer'
import { setIsAutorized, setIsLoading } from '../../reducers/UserReducer'

const Buttons = ({ array, isAuth }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const sighOut = async () => {
    try {
      dispatch(setIsLoading(true))
      dispatch(setIsAutorized(false))
      const token = localStorage.getItem('token')
      await new Promise(resolve => setTimeout(resolve, 2000))
      await API.delete('/logout', { token })
    } catch (err) {
      console.error(err)
    }
  }

  const handleClick = async value => {
    if (value !== 'Sign out') {
      return
    }

    try {
      navigate('/aboutus')
      await sighOut()
      dispatch(setCleanUp())
    } catch (err) {
      console.error(err)
    } finally {
      dispatch(setIsLoading(false))
    }
  }
  return (
    <>
      {array.map(
        ({ buttonValue, urlValue, isAuthorized }) =>
          (urlValue === 'aboutus' || isAuthorized === isAuth) && (
            <li key={urlValue}>
              <Button
                onClick={() => handleClick(buttonValue)}
                name={buttonValue}
                path={urlValue}
              />
            </li>
          )
      )}
    </>
  )
}

export default Buttons
