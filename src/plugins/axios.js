'use strict'

import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.headers.post['Content-Type'] = 'application/json'

const config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  timeout: 60 * 1000, // Timeout
  withCredentials: true, // Check cross-site Access-Control
  transformRequest: [function (data, headers) {
    return qs.stringify(data)
  }]
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function ({ data, code }) {
    // Do something with response data
    const { data: retData, code: errCode, msg } = data
    if (errCode === 0) {
      return retData
    } else {
      return Promise.reject(msg)
    }
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function (data) {
    return data
  },
  function (error) {
    // Do something with response error
    Message.error(error)
    return Promise.reject(error)
  }
)

export default _axios
