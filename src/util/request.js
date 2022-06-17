/**
 * axios 二次封装
 */
 import axios from "axios";
 import config from "./../config";
 import { ElMessage } from "element-plus";
 import router from "./../router";
 const TOKEN_INVALID = "Tonken 认证失败";
 const NETWORK_ERROR = "网络请求异常，请稍后重试";
 console.log("baseURL===>", config.baseURL);
 // 创建 axios 实例对象，添加全局配置
 const service = axios.create({
   baseURL: config.baseURL,
   timeout: 8000,
 });
 
 // 请求拦截
 service.interceptors.request.use((req) => {
   console.log("baseURL===>", config.baseURL);
   console.log("11111", service.defaults.baseURL);
   const headers = req.headers;
   if (!headers.Authorization) headers.Authorization = "Bear Jack";
   return req;
 });
 
 // 响应拦截
 service.interceptors.response.use((res) => {
   const { code, data, msg } = res.data;
   if (code === 200) {
     return data;
   } else if (code === 40001) {
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