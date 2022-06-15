<script>
export default {
  name: "Login",
};
</script>

<template>
  <div class="login-wrapper">
    <div class="model">
        <el-form>
          <div class="title">火星</div>
          <el-form-item >
            <el-input type="text" placeholder="请输入账号" prefix-icon="avatar" />
          </el-form-item>
          <el-form-item >
            <el-input type="password" placeholder="请输入密码" prefix-icon="search" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="btn-login">登录</el-button>
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