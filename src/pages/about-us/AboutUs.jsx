import React, { useEffect, useState } from 'react'

import { getInfo } from '../../api/apiHelper'
import Preloader from '../../components/preloader/Preloader'

const AboutUs = () => {
  const [info, setInfo] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    getInfo(setInfo, setError)
  }, [])

  if (error) return <h2>{error}</h2>
  if (!info) return <Preloader />

  return <h2>{info}</h2>
}

export default AboutUs
