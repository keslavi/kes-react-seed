import axios from "axios";
import config from "../config";
import { useStoreDirectly } from "./store";

//import { actSpinner } from "../";
import validatedResponse, { messageHttpError } from './axios-validator';

const setCount=(count)=>{
  const store = useStoreDirectly.getState();
  if (count > 0) {
    store.apiBeginRequest();
  } else {
    store.apiEndRequest();
  }
}

// import httpAdapter from 'axios/lib/adapters/http';
// axios.defaults.adapter = httpAdapter;

//task: put the global request headers for endpoint calls here
axios.defaults.headers.common = {
  "Content-Type": "application/json"
};

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    setCount(1);
    return config;
  } /*, function (error) { 
    // Do something with request error
    return Promise.reject(error);
  }*/
);

// Add a response interceptor
axios.interceptors.response.use(
  function (res) {
    setCount(-1);
    return validatedResponse(res); //return response or Promise.reject
  }, function (error) {
    setCount(-1);    
    messageHttpError(error);
    return Promise.reject(error);
  }
);

export const api=axios.create({
  baseURL: config.api,
})

export default api;
