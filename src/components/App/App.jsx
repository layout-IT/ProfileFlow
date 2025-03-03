import React, { useEffect } from 'react'

import Routing from '../routing'
import Button from '../buttons/button/Button'

import { PATH_NAMES } from '../../constants'

import * as style from './App.module.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import Buttons from '../buttons/Buttons'

const App = () => {
  const [isAuth, setIsAuth] = React.useState(false)
  const [isShowButton, setIsShowButton] = React.useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const modifiedPathname = pathname.replace(/^\/+/, '')

    if (PATH_NAMES[modifiedPathname]) {
      navigate(PATH_NAMES[modifiedPathname].urlValue)
      setIsShowButton(true)
    } else {
      setIsShowButton(false)
    }
  }, [pathname])
  const buttonValues = Object.values(PATH_NAMES)

  const {
    aboutus: { buttonValue, urlValue },
  } = PATH_NAMES
  return (
    <div className={style.wrapper}>
      {isShowButton && (
        <ul className={style.buttons}>
          <li>
            <Button name={buttonValue} path={urlValue} />
          </li>
          <Buttons array={buttonValues} isAuth={isAuth} />
        </ul>
      )}
      <Routing />
    </div>
  )
}

export default App
