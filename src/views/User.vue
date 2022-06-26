<script>
import {onMounted,reactive,ref,getCurrentInstance,toRaw} from 'vue'
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
                        2:'离职',
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
        const DialogForm = ref()
        // 是否显示弹窗添加新用户
        const dialogVisible = ref(false)
        // 新增用户Form 对象
        const userForm = reactive({state:3})
        // 新增用户表校验规则
        const rules = reactive({
            userName:[{required:true,message:"请输入用户名称",trigger:'blur'}],
            userEmail:[{required:true,message:"请输入邮箱",trigger:'blur'}],
            mobile:[{pattern:/1\d{10}/,message:'请输入正确的手机号',trigger:'blur'}],
            deptId:[{required:true,message:"请输入所属部门",trigger:'blur'}]
        });
        // 角色列表
        const roleList = ref([])
        // 部门列表
        const deptList = ref([])
        // 定义用户操作的行为
        const action = ref('add')
        onMounted(()=>{
            getUserList();
            getDeptList();
            getRoleList();
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
        // 获取部门列表
        const getDeptList=async ()=>{
            let list = await globalProperties.$api.getDeptList();
            deptList.value = list
        }
        // 获取角色列表
        const getRoleList=async ()=>{
            let list = await globalProperties.$api.getRoleList()
            roleList.value = list
        }
        // 弹窗关闭
        const handleClose = (value)=>{
            dialogVisible.value = false;
            handleReset(value)
        }
        // 新增用户提交
        const handleSubmit = ()=>{
            // 先校验必填项是否填写
            ctx.$refs.DialogForm.validate( async (valid)=>{
                if(valid){
                    //toRaw 把响应式对象转换成普通对象，否则后面修改则会自动修改表单的内容
                    let params = toRaw(userForm);
                    params.userEmail += "@imooc.com";
                    let res = await globalProperties.$api.userSubmit(params)
                    console.log('res',res)
                    if(res){
                        dialogVisible.value = false;
                        ctx.$message.success('用户创建成功');
                        handleReset('dialogForm');
                        getUserList();
                    }
                    
                }
            })
            
        }
        // 编辑用户信息
        const handleEdit = (row)=>{
            action.value = 'edit';
            dialogVisible.value = true;
            // 等 DOM 渲染完成以后再执行代码，即弹窗后复制 row 到 userForm 上面
            ctx.$nextTick(()=>{
                Object.assign(userForm,row);
            })
        }
        return {user,userList,column,getUserList,pager,handleQuery,handleReset,formRef,handleCurrentChange,handleDel,checkdUserIds,handlePatchDel,
            handleSelectionChange,dialogVisible,userForm,rules,getDeptList,getRoleList,roleList,deptList,handleClose,handleSubmit,DialogForm,
            handleEdit,action
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
    <!--  用户列表 -->
    <div class="base-table">
        <div class="action">
            <el-button type="primary" @click="action = 'add';dialogVisible = true">新增</el-button>
            <el-button type="danger" @click="handlePatchDel">批量删除</el-button>
        </div>
        <el-table :data="userList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"/>
            <el-table-column v-for="item in column" :key="item.prop" :prop="item.prop" :label="item.label" :formatter="item.formatter"/>
            <el-table-column>
                <template #default="scope">
                    <!-- scope.row 可以拿到该行的信息 -->
                    <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.row)">删除</el-button>
                </template>  
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="pager.total" class="pagination" :page-size="pager.pageSize" @current-change="handleCurrentChange"/>
    </div>
    <!-- 弹窗添加用户 -->
    <el-dialog v-model="dialogVisible" title="用户新增">
        <el-form :model="userForm" label-width="80px" ref="DialogForm" :rules="rules">
            <el-form-item label="用户名" prop="userName">
                <el-input v-model="userForm.userName" placeholder="请输入用户名称" :disabled="action == 'edit'"/>
            </el-form-item>
            <el-form-item label="邮箱" prop="userEmail">
                <el-input v-model="userForm.userEmail" :disabled="action == 'edit'" placeholder="请输入用户邮箱">
                    <template #append>
                        @imooc.com
                    </template>
                </el-input>
            </el-form-item>            
            <el-form-item label="手机号" prop="mobile">
                <el-input v-model="userForm.mobile" placeholder="请输入手机号"/>
            </el-form-item>            
            <el-form-item label="岗位" prop="job">
                <el-input v-model="userForm.job" placeholder="请输入岗位"/>
            </el-form-item>            
            <el-form-item label="状态" prop="state">
                <el-select v-model="userForm.state">
                    <el-option :value="1" label="在职"></el-option>
                    <el-option :value="2" label="离职"></el-option>
                    <el-option :value="3" label="试用期"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="系统角色" prop="roleList">
                <el-select v-model="userForm.roleList" placeholder="请选择用户系统角色" multiple style="width:100%">
                    <el-option v-for="role in roleList" :key="role._id" :label="role.roleName" :value="role._id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="部门" prop="deptId">
                <!-- 显示的值为label ，提交的值为value ,服务器返回的是_id和deptName,所以使用组件自带的转换工具把 _id替换成value,deptName自动替换成label -->
                <el-cascader v-model="userForm.deptId" :options="deptList" :props="{checkStrictly:true,value:'_id',label:'deptName'}" clearable placeholder="请选择所属部门" style="width:100%"/>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="handleClose(DialogForm)">取消</el-button>
                <el-button type="primary" @click="handleSubmit ">确定</el-button>
            </span>
        </template>
    </el-dialog>
  </div>
</template>

<style lang="scss">
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>