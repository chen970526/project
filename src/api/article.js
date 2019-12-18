// 这个文件主要用于处理与新闻相关的业务
// 1.引入axios
import axios from '@/utils/myaxios'

export const getArticleList = (params) => {
  return axios({
    url: '/post',
    params
  })
}

// 根据文章id获取文章详细

export const getArticleDetail = (id) => {
  return axios({
    url: `/psot/${id}`
  })
}
