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
    url: `/post/${id}`
  })
}

// 文章点赞

export const likeArticleById = (id) => {
  return axios({
    url: `/post_like/${id}`
  })
}

// 文章的收藏

export const collectArticleById = (id) => {
  return axios({
    url: `/post_star/${id}`
  })
}
// 获取我的收藏

export const getMyCollections = (id) => {
  return axios({
    url: `/user_star`
  })
}

// 获取评论列表
export const getCommentsById = (id, params) => {
  return axios({
    url: `/post_comment/${id}`,
    params
  })
}

// 发表评论，包括回复
export const sendComment = (id, data) => {
  return axios({
    method: 'post',
    url: `/post_comment/${id}`,
    data
  })
}
