import axios from "axios";
import validatedResponse, { messageHttpError } from './axios-validator';
// import {clone} from 'helpers';
import { isEmpty } from 'lodash';
import config from "@/config";
import { useStoreDirectly } from "@/store";
import { getAuthToken, signinSilent } from "helpers/authentication/authManager";

/*
 * API Configuration with automatic spinner management
 * 
 * 
 * Usage:
 * - Default behavior: Shows spinner for all requests (unless blockUi===true)
 * - To disable spinner: Set blockUi: true in the request config
 *   Example: api.get('/endpoint', { blockUi: true })
 * 
 * Timeout: 30 seconds default for all requests
 */

axios.defaults.baseURL = config.api;

//task: put the global request headers for endpoint calls here
const headers = {
  "Content-Type": "application/json",
};
axios.defaults.headers.common = { ...axios.defaults.headers.common, ...headers };

axios.defaults.withCredentials = true;

axios.defaults.timeout = 30000;

axios.interceptors.request.use(
  async function (req) {

    if (req.blockUi !== true) {
      useStoreDirectly.getState().apiBeginRequest();
    }

    if (config.debug) {
      const display = {
        method: req.method,
        url: req.url,
        data: req.data,
      };
      console.log(["all"],JSON.stringify(display));
    }

    const user = await getAuthToken();

    const store_user = useStoreDirectly.getState().user;
    const updateReq = (user) => {
      req = {
        ...req,
        headers: {
          ...headers,
          'X-BOA-User-ID': store_user?.userDetail?.userId || '',
          'X-BOA-BOSS-ID': store_user?.userDetail?.bossId || '',
          // 'userId': store_user?.userDetail?.userId || '',
          Authorization: import.meta.env.VITE_JWT || `Bearer ${user?.access_token}`
        }
      };
      return req;
    };

    if (user && !user.expired) {
      updateReq(user);
    }
    else {
      const user = await signinSilent();
      updateReq(user);
    }

    return req;
  }
);

axios.interceptors.response.use(
  function (res) {
    if (res.config?.blockUi !== true) {
      useStoreDirectly.getState().apiEndRequest();
    }
    return validatedResponse(res);
  }, function (error) {
    const config = error.response?.config || error.config;
    if (config?.blockUi !== true) {
      useStoreDirectly.getState().apiEndRequest();
    }
    messageHttpError(error);

    return Promise.reject(error);
  }
);

export default axios;

