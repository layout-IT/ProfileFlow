import { API } from './api/API'
import { DELAY_TIME } from './constants'

export const delayOfPtomise = async () => {
  return await new Promise(resolve =>
    setTimeout(resolve, DELAY_TIME.delayBeforeRequest)
  )
}

export const makeRequest = async token => {
  await API.delete('/logout', { token })
}

export const fetchAuthor = async token => {
  try {
    return await API.get('/author', { token })
  } catch (error) {
    console.error(error)
  }
}

export const fetchQuote = async (authorId, token) => {
  try {
    return await API.get('/quote', { token, authorId })
  } catch (error) {
    console.error(error)
  }
}

export const getInfo = async (setInfo, setError) => {
  try {
    await delayOfPtomise()
    const response = await API.get('/info')
    setInfo(response.data.info)
  } catch (err) {
    setError(err.message || 'An error occurred')
  }
}

export const getProfile = async token => {
  await await API.get('/profile', { token })
}
