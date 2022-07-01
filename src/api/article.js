import request from '../utils/request'
/* eslint-disable *///
//文章列表
export const getArticleList = params => {
    return request({
        method: 'GET',
        url: '/v1_1/articles',
        params
    })
}
//文章内容
export const getArticleContent = articleId => {
    return request({
        method: 'GET',
        url: `/v1_0/articles/${articleId}`

    })
}