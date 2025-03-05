import React from 'react'

import * as style from './ProgressModal.module.scss'
import useFetchAuthorAndQuote from './useFetchAuthorAndQuote'
import { PROGRESS_MODAL_TEXT } from '../../../constants'

const ProgressModal = ({ handleModal }) => {
  const {
    isRequestPassed,
    author,
    authorQuote,
    timer,
    setTimer,
    setIsRequestPassed,
  } = useFetchAuthorAndQuote()

  const handleClick = () => {
    if (timer) {
      clearTimeout(timer)
      setTimer(null)
      setIsRequestPassed(true)
      handleModal(true)
    } else {
      handleModal(false)
    }
  }
  return (
    <div className={style.wrapper}>
      <div className={style.items}>
        <h2 className={style.item}>Requestiong the quote</h2>
        <div className={style.item}>
          Step1: {PROGRESS_MODAL_TEXT.step1}...{' '}
          {!author ? 'Loading' : 'Completed'}{' '}
        </div>
        <div className={style.item}>
          Step2: {PROGRESS_MODAL_TEXT.step2}...
          {author && (!authorQuote ? 'Loading' : 'Completed')}
        </div>
        {isRequestPassed && (
          <div className={style.redText}>
            The request was cancelled. The modal will close in 3 seconds
          </div>
        )}
        <button
          disabled={isRequestPassed}
          onClick={() => handleClick()}
          className={`${style.button} ${isRequestPassed && style.disabled}`}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default ProgressModal
