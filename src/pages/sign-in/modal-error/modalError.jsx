import React from 'react'
import { useDispatch } from 'react-redux'

import * as style from './ModalError.module.scss'
import { setIsLoading } from '../../../reducers/UserReducer'

const ModalError = ({ text, setErrorText }) => {
  const dispach = useDispatch()

  const onHandleClick = () => {
    setErrorText('')
    dispach(setIsLoading(false))
  }
  return (
    <div className={style.container}>
      <div className={style.modal}>
        <p>{text}</p>
        <button onClick={onHandleClick}>назад</button>
      </div>
    </div>
  )
}

export default ModalError
