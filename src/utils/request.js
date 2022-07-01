/* eslint-disable */
import axios from 'axios'
import store from '@/store'
import JSONBIG from 'json-bigint'
const request = axios.create({
    // baseUrl: 'http://api-toutiao-web.itheima.net/app',
    baseURL: 'http://api-toutiao-web.itheima.net/app',
    transformResponse: [function (data) {
        // Do whatever you want to transform the data
        try {
            return JSONBIG.parse(data) //返回大数据处理后的文章id
        } catch (err) {
            return data
        }

    }],
})
export default request
// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const { user } = store.state
    if (user) {
        config.headers.Authorization = `Bearer ${user.data.token}`
    }
    console.log('给了header');
    console.log(config);

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
