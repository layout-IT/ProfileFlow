import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Button from './button/Button'
import { API } from '../../api/API'
import { setIsAutorized, setIsLoading } from '../../reducers/UserReducer'
import { setCleanUp } from '../../reducers/AuthorReducer'

const Buttons = ({ array, isAuth }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const sighOut = async () => {
    try {
      dispatch(setIsLoading(true))
      dispatch(setIsAutorized(false))
      const token = localStorage.getItem('token')

      await API.delete('/logout', { token })
    } catch (err) {
      console.error(err)
    }
  }

  const handleClick = async value => {
    console.log({ value })

    if (value !== 'Sign out') {
      return
    }

    try {
      await sighOut()
      navigate('/aboutus')
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
