import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import * as style from './Profile.module.scss'
import { API } from '../../api/API'
import image from '../../assets/img/owl.webp'
import ProgressModal from '../../components/modals/progress-modal/ProgressModal'
import Preloader from '../../components/preloader/Preloader'
import { setIsLoading } from '../../reducers/UserReducer'

const Profile = () => {
  const isLoading = useSelector(state => state.user.isLoading)
  const author = useSelector(state => state.author.name)
  const quote = useSelector(state => state.quote.quote)

  const [name, setName] = useState('')
  const [token, settoken] = useState('')
  const [isShowModal, setIsShowModal] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const fetchProfile = async token => {
    try {
      dispatch(setIsLoading(true))
      await new Promise(resolve => setTimeout(resolve, 2000))
      const response = await API.get('/profile', { token })
      return response
    } catch (error) {
      console.error(error)
    } finally {
      dispatch(setIsLoading(false))
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/signin')
      return
    }
    settoken(token)

    fetchProfile(token).then(response => {
      if (response) {
        setName(response.data.fullname.split(' ')[0])
      }
    })
  }, [dispatch, navigate])

  const handleModal = (isRequestPassed = false) => {
    if (isRequestPassed === true) {
      setTimeout(() => setIsShowModal(false), 3000)
      return
    }
    if (isRequestPassed === false) {
      setIsShowModal(false)
      return
    }
    setIsShowModal(true)
  }

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
