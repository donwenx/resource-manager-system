// import { mockSessionList } from "./mock";

export const IS_DEV = process.env.NODE_ENV === 'development';

export const HOSTS_KEY = 'mino-host';

export const DEFAULT_HOST = (process.env.VUE_APP_HOSTS || '').length > 0 ? process.env.VUE_APP_HOSTS : window.location.host;

export const API = {
  CREATE_USER: {
    method: 'POST',
    url: '/api/user/create',
  },
  LOGIN_USER: {
    method: 'POST',
    url: '/api/user/login',
  },
  LOGOUT_USER: {
    method: 'POST',
    url: '/api/user/logout'
  },
  USER_INFO_LIST: {
    method: 'GET',
    url: '/api/user/list'
  },
  USER_UPDATE: {
    method: 'POST',
    url: '/api/user/update',
  },
  SUP_USER_UPDATE: {
    method: 'POST',
    url: '/api/user/supUpdate',
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
  RESOURCE_UPDATE: {
    method: 'POST',
    url: '/api/resource/update',
  },
  STATISTICS: {
    method: 'GET',
    url: '/api/app/statistics',
  },
  // 分类管理
  CATEGORY_CREATE: {
    method: 'POST',
    url: '/api/category/create',
  },
  CATEGORY_LIST: {
    method: 'GET',
    url: '/api/category/list',
  },
  CATEGORY_UPDATE: {
    method: 'POST',
    url: '/api/category/update',
  },
};

export const TOKEN = 'token';
export const USER_INFO = 'userInfo';

export const HTTP_TIMEOUT = 30000;