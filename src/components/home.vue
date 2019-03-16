<template>
  <el-container class="container">
    <el-header class="Header">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img src="../assets/logo.png" alt>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="grid-content bg-purple-light middle">电商后台管理系统</div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <a href="#" class="loginout">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="Aside">
        <el-menu default-active="2" class="el-menu-vertical-demo" unique-opened router>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item index="users">
              <i class="el-icon-menu"></i>
              选项2
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item index="1-2">
              <i class="el-icon-menu"></i>
              选项2
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item index="1-2">
              <i class="el-icon-menu"></i>
              选项2
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item index="1-2">
              <i class="el-icon-menu"></i>
              选项2
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item index="1-2">
              <i class="el-icon-menu"></i>
              选项2
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="Main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style>
.container {
  height: 100%;
}
.Main {
  background-color: #c57777;
  height: 100%;
}
.Header {
  background-color: #b3c0d1;
}
.Aside {
  background-color: #6d6fca;
  height: 100%;
}
.loginout {
  line-height: 60px;
  text-decoration: none;
}
.middle {
  text-align: center;
  line-height: 60px;
  font-size: 24px;
  color: #fff;
  font-weight: bold;
}
</style>
