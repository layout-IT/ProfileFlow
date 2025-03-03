import React from 'react'
import image from '../../assets/img/owl.webp'
import * as style from './Profile.module.scss'
const Profile = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.frame}>
          <span className={style.avatar}>
            <img src={image} alt="Сова" />
          </span>
        </div>
        <div className={style.greeting}>
          <h3>Welcome, </h3>
          <button>Update</button>
        </div>
      </div>
      <p>Lorem, ipsum dolor sit amet consectetur .</p>
    </div>
  )
}
export default Profile
