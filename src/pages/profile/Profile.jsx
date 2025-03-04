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
  const [isShowModal, setIsShowModal] = useState(false)
  const [isAbort, setIsAbort] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const controller = new AbortController()
  const signal = controller.signal

  const fetchProfile = async token => {
    try {
      dispatch(setIsLoading(true))
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

    fetchProfile(token).then(response => {
      if (response) {
        setName(response.data.fullname.split(' ')[0])
      }
    })
  }, [dispatch, navigate])

  const onClickHandler = (abort = '') => {
    if (abort === 'abort') {
      setTimeout(() => {
        setIsShowModal(false)
      }, 4000)
      controller.abort()
      setIsAbort(true)
      return
    }

    isAbort && setIsAbort(false)
    setIsShowModal(!isShowModal)
  }

  if (isLoading) return <Preloader />

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
            <button onClick={onClickHandler}>update</button>
          </div>
        </div>
      </div>
      <div>
        <blockquote>
          {quote && <p>Цитата: {quote}</p>}

          {author && <span>©{author}</span>}
        </blockquote>
      </div>
      {isShowModal && (
        <ProgressModal
          isAbort={isAbort}
          signal={signal}
          onClickHandler={onClickHandler}
        />
      )}
    </div>
  )
}

export default Profile
