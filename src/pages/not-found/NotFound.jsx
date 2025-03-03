import React from 'react'
import image from '../../assets/img/Page-Not-Found.png'
import * as style from './NotFound.module.scss'
const NotFound = () => {
  return (
    <div className={style.error} style={{ backgroundImage: `url(${image})` }} />
  )
}

export default NotFound
