import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Button from './button/Button'
import { setCleanUp } from '../../reducers/AuthorReducer'
import { setIsLoading } from '../../reducers/UserReducer'
import { logoutUser } from '../../thunks'

const Buttons = ({ array, isAuth }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleClick = async value => {
    if (value !== 'Sign out') {
      return
    }

    try {
      navigate('/aboutus')

      await dispatch(logoutUser())
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
