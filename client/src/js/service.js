import { API, TOKEN, USER_INFO } from '@/js/config';
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
    return;
  }

  if (code !== 0) {
    Message({
      message: response.data.message,
      type: 'error'
    });
    return;
  }
  // console.log('response', response)
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});

export const register = async (data) => {
  try {
    const response = await axios({
      ...API.CREATE_USER,
      data: {
        name: data.name,
        password: data.password,
      }
    });
    console.log(response);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const login = async (data) => {
  try {
    const response = await axios({
      ...API.LOGIN_USER,
      data: {
        uid: data.uid,
        password: data.password,
      }
    })
    const userInfo = JSON.stringify(response.data.data);
    console.log(response);
    window.localStorage.setItem(TOKEN, response.data.data.token);
    window.localStorage.setItem(USER_INFO, userInfo);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export const logout = async () => {
  try {
    const response = await axios({
      ...API.LOGOUT_USER,
    })
    window.localStorage.removeItem(TOKEN);
    console.log(response);
  } catch (err) {
    console.error(err)
  }
}

export const upload = async (data) => {
  try {
    const response = await axios({
      ...API.UPLOAD_FILE,
      data,
    })
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export const userInfoList = async (data) => {
  try {
    const response = await axios({
      ...API.USER_INFO_LIST,
      params: data,
    })
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export const userUpdate = async (data) => {
  try {
    const response = await axios({
      ...API.USER_UPDATE,
      data,
    })
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export const supUserUpdate = async (data) => {
  try {
    const response = await axios({
      ...API.SUP_USER_UPDATE,
      data,
    })
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export const resourceList = async (data) => {
  try {
    const response = await axios({
      ...API.RESOURCE_LIST,
      params: data,
    })
    return response.data.data;
  } catch (err) {
    console.error(err);
  }
}

export const resourceDownload = async (data) => {
  try {
    await axios({
      ...API.RESOURCE_DOWNLOAD,
      params: data,
      // headers: { 'token': token },
    })
    // return response.data;
  } catch (err) {
    console.error(err);
  }
}

export const resourceUpdate = async (data) => {
  try {
    const response = await axios({
      ...API.RESOURCE_UPDATE,
      data,
    })
    return response;
  } catch (err) {
    console.error(err);
  }
}

export const getStatistics = async () => {
  try {
    const response = await axios({
      ...API.STATISTICS,
    })
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

// 分类管理
export const categoryCreate = async (data) => {
  try {
    const response = await axios({
      ...API.CATEGORY_CREATE,
      data,
    })
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export const getCategoryList = async (data) => {
  try {
    const response = await axios({
      ...API.CATEGORY_LIST,
      params: data,
    })
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export const categoryUpdate = async (data) => {
  try {
    const response = await axios({
      ...API.CATEGORY_UPDATE,
      data,
    })
    return response.data;
  } catch (err) {
    console.error(err);
  }
}
