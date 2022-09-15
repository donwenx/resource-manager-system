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

export const upload = async (data) => {
  try {
    const token = window.localStorage.getItem(TOKEN);
    const response = await axios({
      ...API.UPLOAD_FILE,
      data,
      headers: { 'token': token },
    })
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export const resourceList = async (data) => {
  try {
    const token = window.localStorage.getItem(TOKEN);
    const response = await axios({
      ...API.RESOURCE_LIST,
      params: data,
      headers: { 'token': token },
    })
    return response.data.data;
  } catch (err) {
    console.error(err);
  }
}

export const resourceDownload = async (data) => {
  try {
    // const token = window.localStorage.getItem(TOKEN);
    await axios({
      ...API.RESOURCE_DOWNLOAD,
      params: data,
      // headers: { 'token': token },
    })
    // return response.data;
  } catch(err){
    console.error(err);
  }
}