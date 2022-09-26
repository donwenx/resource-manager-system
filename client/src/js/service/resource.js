import { API} from '@/js/config';
import axios from 'axios';


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
