/**
 * api管理
 */
 import request from './../util/request.js'
 export default {
     login(params) {
         return request({
             url: '/users/login',
             method: 'post',
             data: params,
             mock:false
         })
     },
     noticeCount(params) {
         return request({
             url: '/leave/count',
             method: 'get',
             data: {},
             mock: true
         })
     },
     getMenuList(params) {
         return request({
             url: '/menu/list',
             method: 'get',
             data: params,
             mock: true
         })
     },
     getUserList(params) {
         return request({
             url: '/users/list',
             method: 'get',
             data: params,
             mack:true
         })
     },
     userDel(params) {
         return request({
             url: '/users/delete',
             method: 'post',
             data: params,
             mock:true
         })
     },
     getRoleList() {
         return request({
             url: '/roles/allList',
             method: 'get',
             data: {},
             mock: true
         })
     },
     getDeptList() {
         return request({
             url: '/dept/list',
             method: 'get',
             data: {},
             mock: true
         })
     },
     userSubmit(params) {
         return request({
             url: '/users/operate',
             method: 'post',
             data: params,
             mock: false
         })
     },
     menuSubmit(params) {
         return request({
             url: '/menu/operate',
             method: 'post',
             data: params,
             mock: false
         })
     }
 }