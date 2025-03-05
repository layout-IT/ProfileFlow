import React from 'react'
import { useDispatch } from 'react-redux'

import * as style from './ModalError.module.scss'
import { TEXT_ERROR } from '../../../constants'
import { setIsLoading } from '../../../reducers/UserReducer'

const ModalError = ({ text, setErrorText }) => {
  const dispach = useDispatch()

  const onHandleClick = () => {
    setErrorText('')
    dispach(setIsLoading(false))
  }

  const displayText = TEXT_ERROR.fromServer === text ? TEXT_ERROR.toSend : text

  return (
    <div className={style.container}>
      <div className={style.modal}>
        <p>{displayText}</p>
        <button onClick={onHandleClick}>Назад</button>
      </div>
    </div>
  )
}

export default ModalError
