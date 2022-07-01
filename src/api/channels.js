import request from '../utils/request'
/* eslint-disable */// 获取全部频道
export const getAllChannels = () => {
    return request({
        method: 'GET',
        url: '/v1_0/channels'
    })
}
// 添加频道
export const addMyChannels = (channels) => {
    return request({
        method: 'PATCH',
        url: '/v1_0/user/channels',
        data: {
            channels: [channels]
        }
    })
}
