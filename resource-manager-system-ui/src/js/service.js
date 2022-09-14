import { API, TOKEN } from '@/js/config';
import axios from 'axios';


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
    console.log('logindata：', {
      ...API.LOGIN_USER,
      data: {
        uid: data.uid,
        password: data.password,
      }
    })
    const response = await axios({
      ...API.LOGIN_USER,
      data: {
        uid: data.uid,
        password: data.password,
      }
    })
    console.log(response);
    window.localStorage.setItem(TOKEN, response.data.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}
