/**
 * axios 二次封装
 */
 import axios from "axios";
 import config from "./../config";
 import { ElMessage } from "element-plus";
 import router from "./../router";
 import storage from './storage.js'
 const TOKEN_INVALID = "Tonken 认证失败";
 const NETWORK_ERROR = "网络请求异常，请稍后重试";
 // 创建 axios 实例对象，添加全局配置
 const service = axios.create({
   baseURL: config.baseURL,
   timeout: 8000,
 });
 
 // 请求拦截
 service.interceptors.request.use((req) => {
   const headers = req.headers;
   // 从本地存储中获取token值，然后后续所有的请求都会带 token 请求
   const {token} = storage.getItem('userInfo');
   if (!headers.Authorization) headers.Authorization = "Bear " + token;
   return req;
 });
 
 // 响应拦截
 service.interceptors.response.use((res) => {
   const { code, data, msg } = res.data;
   if (code === 200) {
     return data;
   } else if (code === 50001) {
     ElMessage.error(TOKEN_INVALID);
     setTimeout(() => {
       router.push("/login");
     }, 1500);
     return Promise.reject(TOKEN_INVALID);
   } else {
     ElMessage.error(msg || NETWORK_ERROR);
     return Promise.reject(msg || NETWORK_ERROR);
   }
 });
 
 // 封装
 /**
  *
  * @param {*} option 请求配置
  * @returns
  */
 function request(options) {
   options.method = options.method || "get";
   if (options.method.toLowerCase() === "get") {
     options.params = options.data;
   }
   if(typeof options.mock != 'undefined'){
    config.mock = options.mock
   }
   if (config.env === "prod") {
     service.defaults.baseURL = config.baseURL;
   } else {
     service.defaults.baseURL = config.mock ? config.mockApi : config.baseApi;
   }
   return service(options);
 }
 
 ["get", "post", "put", "delete", "patch"].forEach((item) => {
   request[item] = (url, data, options) => {
     return request({
       url,
       data,
       method: item,
       ...options,
     });
   };
 });
 export default request;