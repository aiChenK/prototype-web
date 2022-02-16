import axios from 'axios'
import { Message } from 'element-ui';

axios.defaults.timeout = 25000

export function GET(url, params, option = {}, config = {}){
    if (params) {
        config.params = params
    }
    return fetch(url, 'get', option, config)
}

export function POST(url, params, option = {}, config = {}){
    if (params) {
        config.data = params
    }
    return fetch(url, 'post', option, config)
}

export function DELETE(url, params, option = {}, config = {}){
    if (params) {
        config.params = params
    }
    return fetch(url, 'delete', option, config)
}

export function PATCH(url, params, option = {}, config = {}){
    if (params) {
        config.data = params
    }
    return fetch(url, 'patch', option, config)
}

// 统一请求
function fetch(url, method, option, config) {
    config.url = url
    config.method = method || 'get'
    return axios(config)
        .then(res => {
            if(typeof res === 'string'){
                return Promise.reject({response: {statusText: `接口${url}未返回正确格式`}})
            }
            if (option.successMsg) {
                Message.success(typeof option.successMsg === 'string' ? option.successMsg : res.msg)
            }
            return Promise.resolve(res)
        })
        .catch(err => {
            let errorMsg = option.errorMsg || (err.response && err.response.data && (err.response.data.msg||err.response.data.description)) || err.response.statusText || '未知错误'
            if (option.errorMsg !== false) {
                Message.error(errorMsg)
            }
            return Promise.reject(err)
        })
}


// //创建默认实例
// const http = axios.create({
//     timeout: 5000
// })

// // http.interceptors.request.use(config => {
// //     return config
// // })

// http.interceptors.response.use(
//     response => {
//         return response
//     },
//     error => {
//         Message.error(error.response.data.msg || error.message)
//         return Promise.reject(error)
//     }
// )
// export default http