/**
 * 环境配置封装
 */
 const env = import.meta.env.Mode || "prod";
 const EnvConfig = {
    development: {
     baseApi: "/",
     mockApi:
       "https://www.fastmock.site/mock/29a83cfd56681806766cdc65b1b5df47/api",
   },
   test: {
     baseApi: "/",
     mockApi:
       "https://www.fastmock.site/mock/29a83cfd56681806766cdc65b1b5df47/api",
   },
   prod: {
     baseApi: "/",
     mockApi: "",
   },
 };
 export default {
   env,
   mock: true,
   namespace:'manager',
   ...EnvConfig[env],
 };