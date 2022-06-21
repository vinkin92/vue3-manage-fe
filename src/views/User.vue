<script>
import {onMounted,reactive,ref,getCurrentInstance} from 'vue'
export default {
    name: "User",
    setup(){
        const {ctx} = getCurrentInstance()
        // 获取composition api 挂在全局对象中的 api
        const  globalProperties = getCurrentInstance().appContext.config.globalProperties;
        // 初始化用户表单对象
        const user = reactive({state:0});
        // 初始化用户列表数据
        const userList = ref([]);
        // 定义表格表头数据
        const column = reactive([
            {label:'用户id',prop:"userId"},
            {label:'用户名',prop:"userName"},
            {label:'用户邮箱',prop:"userEmail"},
            {label:'用户角色',prop:"role"},
            {label:'用户状态',prop:"state"},
            {label:'注册时间',prop:"createTime"},
            {label:'最后登录时间',prop:"lastLoginTime"},
        ]);
        const pager = reactive({
            pageNum:1,
            pageSize:10
        })
        const formRef = ref()
        onMounted(()=>{
            getUserList()
        })
        const getUserList = async ()=>{
            let params = {...user,...pager};
            try {
                const {list,page} = await globalProperties.$api.getUserList(params);
                userList.value = list;
                pager.total = page.total;
            } catch (error) {
                console.log(error)
            }
        }
        // 查询 
        const handleQuery = ()=>{
            getUserList()
        }
        // 重置
        const handleReset = (formEl)=>{
            if(!formEl)return;
            formEl.resetFields() 
        }
        //分页时间处理
        const handleCurrentChange = (val)=>{
            pager.pageNum = val;
            getUserList()
        }
        return {user,userList,column,getUserList,pager,handleQuery,handleReset,formRef,handleCurrentChange}
    }
};
</script>

<template>
  <div class="user-manager">
    <div class="query-form">
        <el-form :inline="true" :model="user" ref="formRef">
            <el-form-item label="用户ID" prop="userId">
                <el-input v-model="user.userId" placeholder="请输入用户ID"/>
            </el-form-item>            
            <el-form-item label="用户名称" prop="userName">
                <el-input v-model="user.userName" placeholder="请输入用户名称"/>
            </el-form-item>
            <el-form-item label="用户状态" prop="state">
                <el-select v-model="user.state">
                    <el-option :value="0" label="所有"></el-option>
                    <el-option :value="1" label="在职"></el-option>
                    <el-option :value="2" label="离职"></el-option>
                    <el-option :value="3" label="试用期"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button tyoe="primary" @click="handleQuery">查询</el-button>
                <el-button @click="handleReset(formRef)">重置</el-button>
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
        <el-pagination background layout="prev, pager, next" :total="pager.total" class="pagination" :page-seze="pager.pageSize" @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<style lang="scss">
</style>