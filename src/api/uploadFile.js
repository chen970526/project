// 这个文件专门用于处理上传的业务
// 1.引入axios
import axios from '@/utils/myaxios.js'

// 1.实现文件上传
export const uploadFile = (data) => {
  return axios({
    url: '/upload',
    method: 'post',
    data
  })
}
