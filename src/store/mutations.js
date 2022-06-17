/**
 * Mutations业务层数据提交
 */
 import storage from './../util/storage.js';

 export default {
     saveUserInfo(state,userInfo){
         state.userInfo = userInfo;
         storage.setItem('userInfo',userInfo)
     }
 }