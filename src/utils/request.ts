import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios'

export const HTTP_URL = 'http://localhost:8080/lavector'
export const BASE_URL = ''

// 从localStorage中获取token
function getLocalToken() {
  const token = window.localStorage.getItem('accessToken')
  return token
}

// 从localStorage中获取token
function getLocalRefreshToken() {
  const refreshToken = window.localStorage.getItem('refreshToken')
  return refreshToken
}

function refreshToken() {
  // instance是当前request.js中已创建的axios实例
  return instance
    .post('/auth-center/authorize/token/refresh?refreshToken=' + getLocalRefreshToken())
    .then(res => res)
}

// 创建一个axios实例
const instance: AxiosInstance = axios.create({
  timeout: 300000,
  headers: {
    'Content-Type': 'application/json',
    // Authorization: getLocalToken() ? "Bearer " + getLocalToken() : null, // headers塞token
  },
})

// 给实例添加一个setToken方法，用于登录后将最新token动态添加到header，同时将token保存在localStorage中
// (instance as any).setToken = (accessToken: string, refreshToken: string) => {
//   instance.defaults.headers["Authorization"] = accessToken;
//   window.localStorage.setItem("accessToken", accessToken);
//   window.localStorage.setItem("refreshToken", refreshToken);
// };

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = window.localStorage.getItem('accessToken')
    if (token && config.headers) {
      config.headers.Authorization = 'Bearer ' + getLocalToken()
    }
    config.baseURL = HTTP_URL
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// 是否正在刷新的标记
let isRefreshing = false

interface resFunc {
  (token: string): void
}
// 重试队列，每一项将是一个待执行的函数形式
let requests: resFunc[] = []

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const { status } = response.data
    console.log(status)
    if (status && status === 2005) {
      const config: AxiosRequestConfig = response.config
      if (!isRefreshing) {
        isRefreshing = true
        return refreshToken()
          .then(res => {
            const { status } = res.data

            if (status === 2004) {
              console.error('refreshtoken error =>', res)
              window.localStorage.removeItem('accessToken')
              window.localStorage.removeItem('refreshToken')
              window.location.href = '/'
            }
            //(instance as any).setToken(accessToken, refreshToken);
            const { accessToken, refreshToken } = res.data.data
            instance.defaults.headers.common['Authorization'] = accessToken
            window.localStorage.setItem('accessToken', accessToken)
            window.localStorage.setItem('refreshToken', refreshToken)

            if (config.headers) {
              config.headers['Authorization'] = accessToken
            }
            config.baseURL = ''
            // 已经刷新了token，将所有队列中的请求进行重试
            requests.forEach(cb => cb(accessToken))
            requests = []
            return instance(config)
          })
          .catch(res => {
            console.error('refreshtoken error =>', res)
            window.localStorage.removeItem('accessToken')
            window.localStorage.removeItem('refreshToken')
            window.location.href = '/'
          })
          .finally(() => {
            isRefreshing = false
          })
      } else {
        // 正在刷新token，将返回一个未执行resolve的promise
        return new Promise(resolve => {
          // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
          requests.push((token: string) => {
            config.baseURL = ''
            if (config.headers) {
              config.headers['Authorization'] = token
            }
            resolve(instance(config))
          })
        })
      }
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default instance
