import React from 'react'

import * as style from './NotFound.module.scss'
import image from '../../assets/img/Page-Not-Found.png'


const NotFound = () => {
  return (
    <div className={style.error} style={{ backgroundImage: `url(${image})` }} />
  )
}

export default NotFound
