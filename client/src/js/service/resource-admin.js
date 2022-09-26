import { API} from '@/js/config';
import axios from 'axios';


export const resourceAdminList = async (data) => {
  try {
    const response = await axios({
      ...API.RESOURCE_ADMIN_LIST,
      params: data,
    })
    return response.data.data;
  } catch (err) {
    console.error(err);
  }
}


export const resourceAdminUpdate = async (data) => {
  try {
    const response = await axios({
      ...API.RESOURCE_ADMIN_UPDATE,
      data,
    })
    return response;
  } catch (err) {
    console.error(err);
  }
}
