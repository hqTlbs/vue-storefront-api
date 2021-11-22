import axios from 'axios'
// import store from '@/store'

// create an axios instance
const service = axios.create({
  baseURL: 'http://shop-middleware.adn.d3v/api/', // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    // if (store.getters.token) {
    // let each request carry token
    // ['X-Token'] is a custom headers key
    // please modify it according to the actual situation
    // config.headers['X-Token'] = getToken()
    // }
    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // console.log('res', response)
    if (1 === 2 && res.code && res.code !== 20000) {
      if (res.code === 50100) {
        // store.dispatch('user/logout')
        // router.push('/login')
        return Promise.reject(new Error(res.message || 'Achtung: ein Fehler ist aufgetreten.'))
      }
      if (res.code >= 50500) {
        return Promise.reject(new Error(res.message || 'Achtung: ein Fehler ist aufgetreten.'))
      } else {
        return res
      }
    } else {
      return res
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
