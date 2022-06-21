<script>
import TreeMenu from './TreeMenu.vue'
import BreadCrumb from './BreadCrumb.vue'
export default {
  name: "Home",
  components:{TreeMenu,BreadCrumb},
  data(){
    return{
      userInfo:this.$store.state.userInfo,
      isCollapse:false,
      noticeCount:0,
      userMenu:[],
      activeMenu:location.hash.slice(1),
    }
  },
  mounted(){
    this.getNoticeCount()
    this.getMenuList()
  },
  methods:{
    handleLogout(key){
      if(key == 'email')return;
      this.$store.commit('saveUserInfo','');
      this.userInfo = null;
      this.$router.push('/login');
    },
    toggle(){
      this.isCollapse = !this.isCollapse;
    },
    async getNoticeCount(){
      try {
        // 获取用户待处理信息的数量值
        const count = await this.$api.noticeCount();
        this.noticeCount = count;
      } catch (error) {
        console.log(error)
      }
    },
    // 获取左侧导航栏列表
    async getMenuList(){
      try {
        const list = await this.$api.getMenuList()
        this.userMenu = list
      } catch (error) {
        console.log(error)
      }
    }
  }
};
</script>

<template>
  <div class="basic-layout">
    <!-- 左侧区域 -->
    <div :class="['nav-side',isCollapse?'flod':'unfold']">
      <!-- logo -->
      <div class="logo">
        <img src="./../assets/logo.png">
        <span :style="{'display':isCollapse?'none':'inline'}">Manager</span>
      </div>
      <!-- 导航菜单 -->
      <el-menu :default-active="activeMenu" background-color="#001529" text-color="#fff" router :collapse="isCollapse" class="nav-menu">
        <TreeMenu :userMenu="userMenu"/>
      </el-menu>
    </div>
    <!-- 右侧区域 -->
    <div :class="['content-right',isCollapse?'fold':'unfold']">
      <div class="nav-top">
        <div class="nav-left">
          <el-icon class="menu-fold" @click="toggle"><Fold /></el-icon>
          <div class="bread"><BreadCrumb /> </div>
        </div>

        <div class="userInfo">
          <el-badge :is-dot="noticeCount>0?true:false" class="notice">
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
    // 合并
    &.fold{
      width:64px;
    }
    // 展开
    &.unfold{
      width:200px;
    }
  }
  .content-right{
    margin-left: 200px;
    // 合并
    &.fold{
      margin-left:64px;
    }
    // 展开
    &.unfold{
      margin-left:200px;
    }
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