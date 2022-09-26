import { API } from '@/js/config';
import axios from 'axios';


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
