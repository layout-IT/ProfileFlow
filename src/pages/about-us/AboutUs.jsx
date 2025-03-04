import React, { useEffect, useState } from 'react'

import { API } from '../../api/API'
import Preloader from '../../components/preloader/Preloader'

const AboutUs = () => {
  const [info, setInfo] = useState('')
  const [error, setError] = useState('')

  const fetchInfo = async () => {
    try {
      const response = await API.get('/info')
      setInfo(response.data.info)
    } catch (err) {
      setError(err.message || 'An error occurred')
    }
  }

  useEffect(() => {
    fetchInfo()
  }, [])

  if (error) return <h2>{error}</h2>
  if (!info) return <Preloader />

  return <h2>{info}</h2>
}

export default AboutUs
