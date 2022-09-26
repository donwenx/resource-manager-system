import { TOKEN } from '@/js/config';
import axios from 'axios';
import router from '@/router/index.js'
import { Message } from 'element-ui';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    config.headers.token = token || '';
  }
  // console.log('config.headers.token', token);
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use((response) => {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据，token过期，或者无token时跳转登录
  const code = response.data.code;
  if (code === 1) {
    router.push({ name: 'login' });
    return response;
  }

  if (code !== 0) {
    Message({
      message: response.data.message,
      type: 'error'
    });
    return response;
  }
  // console.log('response', response)
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});