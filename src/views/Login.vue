<script>
export default {
  name: "Login",
  data(){
    return{
      user:{
        userName:"",
        userPwd:""
      },
      rules:{
          userName:[
            {required:true,message:"请输入用户名",trigger:"blur"}
          ],
          userPwd:[
            {required:true,message:"请输入密码",trigger:"blur"}
          ],
        }
    }
  },
  methods:{
    login(){
      // 通过 refs 判断表单是否有值，如果有则进入下一步操作
      this.$refs.userForm.validate(valid=>{
        if(valid){
          this.$api.login(this.user).then(res=>{
            this.$store.commit('saveUserInfo',res)
            this.$router.push('/welcome')
          })
        }
      })
    }
  }
};
</script>

<template>
  <div class="login-wrapper">
    <div class="model">
        <!-- ref vue 操作原生DOM 句柄   -->
        <el-form :model="user" status-icon :rules="rules" ref="userForm">
          <div class="title">火星</div>
          <el-form-item prop="userName">
            <el-input type="text" placeholder="请输入账号" prefix-icon="avatar" v-model="user.userName" />
          </el-form-item>
          <el-form-item prop="userPwd">
            <el-input type="password" placeholder="请输入密码" prefix-icon="search" v-model="user.userPwd" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="btn-login" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<style lang="scss">
.login-wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9fcff;
  width:100vw;
  height:100vh;
  .model{
    width:500px;
    padding:50px;
    background-color:#fff;
    border-radius: 4px;
    box-shadow: 0px 0px 10px 3px #c7c9cb4d;
    .title{
      font-size:50px;
      line-height: 1.5;
      text-align: center;
      margin-bottom: 30px;
    }
    .btn-login{
      width:100%;
    }
  }
}
</style>