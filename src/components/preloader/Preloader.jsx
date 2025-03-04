import React from 'react'

import image from '../../assets/img/spinner.webp'

import * as style from './Preloader.module.scss'
const Preloader = () => {
  return (
    <div className={style.preloader}>
      <img src={image} alt="Загрузка" />
    </div>
  )
}

export default Preloader
