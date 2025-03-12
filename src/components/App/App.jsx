import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { PATH_NAMES } from '../../constants'
import { setIsAutorized } from '../../store/reducers/UserReducer'
import Buttons from '../buttons/Buttons'
import Routing from '../routing'
import * as style from './App.module.scss'

const App = () => {
  const isAutorized = useSelector(state => state.user.isAutorized)
  const [isShowButton, setIsShowButton] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/aboutus')
      return
    }
    dispatch(setIsAutorized(true))
  }, [])

  useEffect(() => {
    const modifiedPathname = pathname.replace(/^\/+/, '').toLocaleLowerCase()

    if (PATH_NAMES[modifiedPathname]) {
      navigate(PATH_NAMES[modifiedPathname].urlValue)
      setIsShowButton(true)
    } else {
      setIsShowButton(false)
    }
  }, [pathname])

  const buttonValues = Object.values(PATH_NAMES)

  return (
    <div className={style.wrapper}>
      {isShowButton && (
        <ul className={style.buttons}>
          <Buttons array={buttonValues} isAuth={isAutorized} />
        </ul>
      )}
      <Routing />
    </div>
  )
}

export default App
