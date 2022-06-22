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
            {label:'用户角色',prop:"role",
                formatter(row,column,value){
                    return{
                        0:'管理员',
                        1:'普通用户'
                    }[value]
                }
            },
            {label:'用户状态',prop:"state",
                formatter(row,column,value){
                    return{
                        1:'在职',
                        2:'普离职',
                        3:'试用期'
                    }[value]
                }
            },
            {label:'注册时间',prop:"createTime"},
            {label:'最后登录时间',prop:"lastLoginTime"},
        ]);
        const pager = reactive({
            pageNum:1,
            pageSize:10
        })
        //选中用户列表的对象
        const checkdUserIds = ref([])
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
        // 用户单个删除
        const handleDel = async (row)=>{
            await globalProperties.$api.userDel({userIds:[row.userId]})
            globalProperties.$message.success('删除成功')
            getUserList()
        }
        // 用户批量删除
        const handlePatchDel = async ()=>{
            if(checkdUserIds.value.length == 0) globalProperties.$message.error('请选择要删除的用户')
            const res = await globalProperties.$api.userDel({userIds:checkdUserIds.value})
            if(res.nModified > 0){
                globalProperties.$message.success('删除成功')
                getUserList()
            }else{
                globalProperties.$message.error('删除失败') 
            }
        }
        // 表格多选
        const handleSelectionChange = (val) => {
            let arr = [];
            val.map((v)=>arr.push(v.userId));
            checkdUserIds.value = arr;
        }
        return {user,userList,column,getUserList,pager,handleQuery,handleReset,formRef,handleCurrentChange,handleDel,checkdUserIds,handlePatchDel,
            handleSelectionChange
        }
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
            <el-button type="danger" @click="handlePatchDel">批量删除</el-button>
        </div>
        <el-table :data="userList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"/>
            <el-table-column v-for="item in column" :key="item.prop" :prop="item.prop" :label="item.label" :formatter="item.formatter"/>
            <el-table-column>
                <template #default="scope">
                    <el-button type="primary" size="small">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.row)">删除</el-button>
                </template>  
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="pager.total" class="pagination" :page-size="pager.pageSize" @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<style lang="scss">
</style>