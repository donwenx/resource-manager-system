// import { API } from '@/js/config';
import axios from 'axios';


export const register = async (data) => {
  try {
    const response = await axios({
      method: 'post',
      url: '/api/user/create',
      data: {
        name: data.name,
        password: data.password,
      }
    });
    console.log(response);
    return response.data;
  } catch (err) {
    console.err(err);
  }
};
