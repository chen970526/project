// 这个文件专门用于处理与users表相关的业务
// 1.引入axios
import axios from '@/utils/myaxios.js'

// 2. 实现登陆验证
export const userLogin = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}

// 3.获取用户详情
export const getUserInfo = (id) => {
  return axios({
    // 我们当前所请求的api是需要授权的api,所以要根据后台的要求传入用户状态
    // 这个状态需要根据后台的严格要求进行传递
    // 后台要求使用：Authorization做为键,token做为值
    // headers: {
    //   Authorization: localStorage.getItem('heima_40_token')
    // },
    url: `/user/${id}`
  })
}
// 4. 编辑用户信息
export const editUser = (id, data) => {
  return axios({
    method: 'post',
    url: `/user_update/${id}`,

    data
  })
}
// 5. 实现用户注册
export const userRegister = (data) => {
  return axios({
    method: 'post',
    url: '/register',
    data
  })
}
// 6.用户关注
export const followUser = (id) => {
  return axios({
    url: `/user_follows/${id}`
  })
}

// 7.用户取消关注
export const unFollowUser = (id) => {
  return axios({
    url: `/user_unfollow/${id}`
  })
}
// 获取我的关注
export const getMyFollows = (id) => {
  return axios({
    url: `/user_follows`
  })
}
