// import { mockSessionList } from "./mock";

export const IS_DEV = process.env.NODE_ENV === 'development';

export const HOSTS_KEY = 'mino-host';

export const DEFAULT_HOST = (process.env.VUE_APP_HOSTS || '').length > 0 ? process.env.VUE_APP_HOSTS : window.location.host;

export const API = {
  CREATE_USER: {
    method: 'POST',
    url: '/api/user/create',
  },
  LOGIN_USER:  {
    method: 'POST',
    url: '/api/user/login',
  },
  UPLOAD_FILE: {
    method: 'POST',
    url: '/api/resource/upload',
  },
  RESOURCE_LIST: {
    method: 'GET',
    url: '/api/resource/list',
  },
  RESOURCE_DOWNLOAD: {
    method: 'GET',
    url: '/api/resource/download',
  },
};

export const TOKEN = 'token';

export const HTTP_TIMEOUT = 30000;