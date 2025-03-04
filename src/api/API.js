export const API = {
  get: (url, params) => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        if (params?.signal?.aborted) {
          rej(new Error('AbortError'))
          return
        }

        if (url === '/info') {
          res({
            success: true,
            data: {
              info: 'Some information about the company.',
            },
          })
        } else if (url === '/profile' && params.token) {
          res({
            success: true,
            data: {
              fullname: 'Aleksei K',
              email: 'aleksei@example.com',
            },
          })
        } else if (url === '/author' && params.token) {
          res({
            success: true,
            data: {
              authorId: 1,
              name: 'Charlie Chaplin',
            },
          })
        } else if (url === '/quote' && params.token && params.authorId) {
          res({
            success: true,
            data: {
              quoteId: 1,
              authorId: 1,
              quote: 'A day without laughter is a day wasted.',
            },
          })
        } else {
          res({ success: false, message: 'Not found' })
        }
      }, 2000)
    })
  },

  post: (url, { email, password }) => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        if (
          url === '/login' &&
          email === 'aleksei@example.com' &&
          password === 'lkJlkn8hj'
        ) {
          res({
            success: true,
            data: {
              token: 'fb566635a66295da0c8ad3f467c32dcf',
            },
          })
        } else {
          rej('Error 404: Invalid credentials')
        }
      }, 1000)
    })
  },

  delete: (url, params) => {
    return new Promise(res => {
      setTimeout(() => {
        if (url === '/logout' && params.token) {
          localStorage.removeItem('token')
          res({
            success: true,
            data: {},
          })
        } else {
          res({ success: false, message: 'Not found' })
        }
      }, 1000)
    })
  },
}
