
import request from '../utils/request'
/* eslint-disable */// 用户登入
export const login = data => {
    return request({
        method: 'POST',
        url: '/v1_0/authorizations',
        data
    })
}
// 发送验证码
export const sendSms = mobile => {
    return request({
        method: 'GET',
        url: `/v1_0/sms/codes/${mobile}`,

    })
}
// 获取用户数据
export const getUserInfo = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user',

    })
}
//获取频道列表
export const getChannelList = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user/channels'
    })
}

