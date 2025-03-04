import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import * as style from './Button.module.scss'

const Button = ({ onClick, path, name }) => {
  const [isActive, setIsActive] = useState(false)

  const { pathname } = useLocation()
  const modifiedPathname = pathname.replace(/^\/+/, '').toLocaleLowerCase()

  const isPath = Boolean(path)

  useEffect(() => {
    if (path === modifiedPathname) {
      setIsActive(true)
      return
    }
    setIsActive(false)
  }, [path, modifiedPathname])

  return isPath ? (
    <Link to={`/${path}`}>
      <button className={`${style.button} ${isActive ? style.active : ''}`}>
        {name}
      </button>
    </Link>
  ) : (
    <button onClick={onClick} className={style.button}>
      {name}
    </button>
  )
}

export default Button
