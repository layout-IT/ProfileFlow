import React from 'react'

import * as style from './Profile.module.scss'
import useProfile from './useProfile'
import image from '../../assets/img/owl.webp'
import ProgressModal from '../../components/modals/progress-modal/ProgressModal'
import Preloader from '../../components/preloader/Preloader'

const Profile = () => {
  const { isLoading, author, quote, name, token, isShowModal, handleModal } =
    useProfile()

  if (isLoading || !token) return <Preloader />

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.frame}>
          <span className={style.avatar}>
            <img src={image} alt="Сова" />
          </span>
        </div>
        <div className={style.greeting}>
          <h3>Добро пожаловать, {name}!</h3>
          <div>
            <button onClick={handleModal}>update</button>
          </div>
        </div>
      </div>
      <div>
        <blockquote>
          {quote && <p>Цитата: {quote}</p>}

          {author && <span>©{author}</span>}
        </blockquote>
      </div>
      {isShowModal && <ProgressModal handleModal={handleModal} />}
    </div>
  )
}

export default Profile
