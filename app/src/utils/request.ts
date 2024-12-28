import axios from 'axios'
import { RequestOptions } from '@/type/Request'

// 从环境变量中获取 API 基础 URL
const baseURL = import.meta.env.VITE_API_URL

// 创建 axios 实例
const request = axios.create({
    baseURL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
})
// 请求拦截器
request.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.reject(error)
})
// 响应拦截器
request.interceptors.response.use(response => {
    return response
}, error => {
    return Promise.reject(error)
})

const Request = (url: string, options: RequestOptions) => {
    let method = options.method || 'GET'
    let params = options.params || {}

    if (method === 'GET' || method === 'get') {
        return new Promise((resolve, reject) => {
            request.get(url,params)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        });
    } else {
        return new Promise((resolve, reject) => {
            request
                .post(url, params)
                .then(res => {
                    if (res && res.data) {
                        resolve(res.data);
                    }
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
}

export default Request
