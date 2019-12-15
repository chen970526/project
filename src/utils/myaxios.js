import axios from 'axios'
import {
  Toast
} from 'vant'
// 配置基准路径
axios.defaults.baseURL = 'http://localhost:3000'
// 将基准路径进行到本地
localStorage.setItem('hm_40_baseURL', axios.defaults.baseURL)

// 添加请求拦截器
// config:相当于当前的请求报文
axios.interceptors.request.use(function (config) {
//   console.log(config)
  // 在发送请求之前做些什么:获取token，判断是否成功的获取，如果有token则添加请求头的设置，否则不处理
  let token = localStorage.getItem('heima_40_token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
// 所有响应都必须经过
axios.interceptors.response.use(function (response) {
//   console.log(response)
  // 对响应数据做点什么
  // 判断当前响应的结果，是否是用户信息验证失败，如果是则重定向
  if (response.data.message === '用户信息验证失败!' || response.data.message === '用户信息验证失败') {
    // 给出提示
    Toast.fail('用户信息验证失败')
    // 重定向
    window.location.href = '#/login'
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default axios
