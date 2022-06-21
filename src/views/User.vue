<script>
import {onMounted,reactive,ref} from 'vue'
export default {
    name: "User",
    setup(){
        const user = reactive({});
        const userList = ref([
            {
                "state": 1,
                "role": "0",
                "roleList": [
                    "60180b07b1eaed6c45fbebdb",
                    "60150cb764de99631b2c3cd3",
                    "60180b59b1eaed6c45fbebdc"
                ],
                "deptId": [
                    "60167059c9027b7f2c520a61",
                    "60167345c6a4417f2d27506f"
                ],
                "userId": 1000002,
                "userName": "admin",
                "userPwd": "admin",
                "userEmail": "admin@imooc.com",
                "createTime": "2021-01-17T13:32:06.381Z",
                "lastLoginTime": "2021-01-17T13:32:06.381Z",
                "__v": 0,
                "job": "前端架构师",
                "mobile": "17611020000"
            }
        ]);
        const column = reactive([
            {label:'用户id',prop:"userId"},
            {label:'用户名',prop:"userName"},
            {label:'用户邮箱',prop:"userEmail"},
            {label:'用户角色',prop:"role"},
            {label:'用户状态',prop:"state"},
            {label:'注册时间',prop:"createTime"},
            {label:'最后登录时间',prop:"lastLoginTime"},
        ]);
        onMounted(()=>{
            console.log('init')
        })
        return {user,userList,column}
    }
};
</script>

<template>
  <div class="user-manager">
    <div class="query-form">
        <el-form :inline="true" :model="user">
            <el-form-item>
                <el-input v-model="user.userId" placeholder="请输入用户ID"/>
            </el-form-item>            
            <el-form-item>
                <el-input v-model="user.userName" placeholder="请输入用户名称"/>
            </el-form-item>
            <el-form-item>
                <el-select v-model="user.state">
                    <el-option :value="0" label="所有"></el-option>
                    <el-option :value="1" label="在职"></el-option>
                    <el-option :value="2" label="离职"></el-option>
                    <el-option :value="3" label="试用期"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button tyoe="primary">查询</el-button>
                <el-button>重置</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="base-table">
        <div class="action">
            <el-button type="primary">新增</el-button>
            <el-button type="danger">批量删除</el-button>
        </div>
        <el-table :data="userList" >
            <el-table-column type="selection" width="55"/>
            <el-table-column v-for="item in column" :key="item.prop" :prop="item.prop" :label="item.label" />
            <el-table-column>
                <template #default>
                    <el-button type="primary" size="small">编辑</el-button>
                    <el-button type="danger" size="small">删除</el-button>
                </template>  
            </el-table-column>
        </el-table>
    </div>
  </div>
</template>

<style lang="scss">
</style>