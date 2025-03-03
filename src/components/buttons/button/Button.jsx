import React from 'react'
import { Link } from 'react-router-dom'

import * as style from './Button.module.scss'

const Button = ({ path, name }) => {
  return (
    <Link to={`/${path}`}>
      <button className={style.button}>{name}</button>
    </Link>
  )
}

export default Button
