import { API, TOKEN, USER_INFO } from '@/js/config';
import axios from 'axios';

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