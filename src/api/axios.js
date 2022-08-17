import axios from 'axios'
import config from '../config'

const baseURL = process.env.NODE_ENV === 'development' ? config.baseURL.dev : config.baseURL.prod

const service =  axios.create({
  // 基础路径
  baseURL,
  // 请求超时时长
  timeout: 5000
})

// 请求拦截器：在发送请求前，请求拦截器能够监测该请求，并对请求做出一些操作
service.interceptors.request.use((config) => {
  // 使用nprogress.start()方法开始展示进度条
  // nprogress.start()

  return config
},  (error)=> {
  return Promise.reject(error);
})
// 响应拦截器：在服务器响应请求返回数据后，请求拦截器能够拦截，并对响应的数据进行一些操作
service.interceptors.response.use((res) => {
  // 使用nprogress.done()方法结束展示进度条
  // nprogress.done()

  return res.data
},(error) => {

  return Promise.reject(error)
})

export default service
