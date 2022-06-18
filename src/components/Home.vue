<script>
export default {
  name: "Home",
  data(){
    return{
      userInfo:{
        userName:'jack',
        userEmail:'111@qq.com'
      },
      isCollapse:false
    }
  },
  methods:{
    handleLogout(key){
      if(key == 'email')return;
      this.$store.commit('saveUserInfo','');
      this.userInfo = null;
      this.$router.push('/login');
    }
  }
};
</script>

<template>
  <div class="basic-layout">
    <!-- 左侧区域 -->
    <div class="nav-side">
      <!-- logo -->
      <div class="logo">
        <img src="./../assets/logo.png">
        <span>Manager</span>
      </div>
      <!-- 导航菜单 -->
      <el-menu default-active="2" background-color="#001529" text-color="#fff" router :collapse="isCollapse" class="nav-menu">
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>系统管理</span>
          </template>
          <el-menu-item index="1-1">用户管理</el-menu-item>
          <el-menu-item index="1-2">菜单管理</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><location /></el-icon>
            <span>审批管理</span>
          </template>
          <el-menu-item index="2-1">休假申请</el-menu-item>
          <el-menu-item index="2-2">待我审批</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
    <!-- 右侧区域 -->
    <div class="content-right">
      <div class="nav-top">
        <div class="nav-left">
          <el-icon class="menu-fold" ><Fold /></el-icon>
          <div class="bread">面包屑</div>
        </div>

        <div class="userInfo">
          <el-badge :is-dot="true" class="notice">
            <el-icon><BellFilled /></el-icon>
          </el-badge>
          <el-dropdown @command="handleLogout">
            <span class="user-link">
              {{userInfo.userName}}
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="email">{{userInfo.userEmail}}</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="wrapper">
        <div class="main-page"><router-view></router-view></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.basic-layout{
  position: relative;
  .nav-side{
    position:fixed;
    width:200px;
    height:100vh;
    background-color: #001529;
    color:#fff;
    overflow-y: auto;
    transition: width .5s;
    .logo{
      display:flex;
      align-items: center;
      font-size: 18px;
      height:50px;
      img{
        width:32px;
        height:32px;
        margin:0 10px;
      }
    }
    .nav-menu{
      height:calc(100vh - 50px );
      border-right: none;
    }
  }
  .content-right{
    margin-left: 200px;
    .nav-top{
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      padding:0 20px;
      .nav-left{
        display: flex;
        align-items: center;
        .menu-fold{
          margin-right: 16px;
          font-size:18px;
        }
      }
      .userInfo{
        display: flex;
        justify-content: center;
        align-items: center;
        .notice{
          line-height:30px;
          margin-right: 15px;
          margin-top: 10px;
        }
        .user-link{
          cursor:pointer;
          color:#409eff;
          font-size:18px;
        }
      }
    }
    .wrapper{
      background-color: #eef0f3;
      padding: 20px;
      height:calc(100vh - 50px);
      .main-page{
        background-color: #fff;
        height:100%;
      }
    }
  }
}
</style>