import request from '../utils/request'
/* eslint-disable */// 获取联想建议
export const getSuggestList = q => {
    return request({
        method: 'GET',
        url: '/v1_0/suggestion',
        params: {
            q
        }
    })
}
//获取搜索结果
export const getSuggestReasult = params => {
    return request({
        method: 'GET',
        url: '/v1_0/search',
        params
    })
}
