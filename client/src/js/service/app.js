import { API } from '@/js/config';
import axios from 'axios';

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