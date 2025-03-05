export const API = {
  get: (url, params) => {
    return new Promise(res => {
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
    })
  },

  post: (url, { email, password }) => {
    return new Promise((res, rej) => {
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
    })
  },

  delete: (url, params) => {
    return new Promise(res => {
      if (url === '/logout' && params.token) {
        localStorage.removeItem('token')
        res({
          success: true,
          data: {},
        })
      } else {
        res({ success: false, message: 'Not found' })
      }
    })
  },
}
