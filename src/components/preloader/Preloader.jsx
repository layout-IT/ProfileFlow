import React from 'react'

import * as style from './Preloader.module.scss'
import image from '../../assets/img/spinner.webp'

const Preloader = () => {
  return (
    <div className={style.preloader}>
      <img src={image} alt="Загрузка" />
    </div>
  )
}

export default Preloader
