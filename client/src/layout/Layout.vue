<template>
  <div class="layout">
    <div class="head">
      <div class="logo">
        <div class="head-img">
          <img src="@/assets/logo.svg" />
        </div>
        <div class="head-title">资源管理系统</div>
      </div>
      <div class="user-info-wrapper">
        <div class="user-icon">
          <img src="@/assets/user-icon.svg" />
        </div>
        <div class="user-name">{{userInfo.name}}（ID：{{userInfo.uid}}）</div>
        <el-link
          class="logout"
          type="primary"
          :underline="false"
          @click="logout"
          >退出登录</el-link
        >
      </div>
    </div>
    <div class="content">
      <div class="sidebar">
        <el-menu
          :default-active="sidebarActive"
          class="sidebar-menu"
          @open="handleOpen"
          @close="handleClose"
          unique-opened
          router
        >
          <el-submenu :index="item.id" v-for="item in sidebar" :key="item.id">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item
              v-for="submenu in item.children"
              :key="submenu.id"
              :index="submenu.id"
              >{{ submenu.title }}</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </div>
      <div class="main">
        <el-card class="breadcrumb-card">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>{{ breadcrumb.name }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ breadcrumb.child }}</el-breadcrumb-item>
          </el-breadcrumb>
        </el-card>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { logout } from "@/js/service.js";
import { USER_INFO } from '@/js/config.js'
export default {
  data() {
    return {
      sidebar: [
        {
          title: "资源管理",
          id: "1",
          icon: "el-icon-setting",
          children: [
            { title: "使用统计", id: "/" },
            { title: "资源上传", id: "/upload" },
            { title: "资源下载", id: "/download" },
            { title: "资源列表", id: "/resourceList" },
          ],
        },
        {
          title: "用户管理",
          id: "2",
          icon: "el-icon-menu",
          children: [{ title: "用户列表", id: "/userList" }],
        },
        {
          title: "分类管理",
          id: "3",
          icon: "el-icon-document",
          children: [{ title: "分类列表", id: "/category" }],
        },
      ],
      userInfo: {},
    };
  },
  created() {
    this.userInfo = this.getUserInfo();
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    logout() {
      logout();
      this.$message({
        message: "退出登录成功！",
        type: "success",
      });
      this.$router.push('/login');
      console.log("退出登录");
    },
    getUserInfo() {
      const userInfo = window.localStorage.getItem(USER_INFO);
      return JSON.parse(userInfo);
    },
  },
  computed: {
    breadcrumb() {
      const path = this.$route.path;
      let name, child;
      this.sidebar.forEach((item) => {
        item.children.forEach((subItem) => {
          if (subItem.id === path) {
            child = subItem.title;
            name = item.title;
          }
        });
      });
      return { name, child };
    },
    sidebarActive() {
      return this.$route.path;
    },
  },
};
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 0;
  height: 48px;
  padding: 0 16px;

  background: #0c193d;
  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;

    .head-img > img {
      height: 32px;
      margin-right: 8px;
    }
    .head-title {
      color: #6174fb;
      font-size: 24px;
      line-height: 24px;
    }
  }
  .user-info-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    cursor: pointer;

    .user-icon > img {
      height: 16px;
      width: 16px;
      margin-right: 8px;
    }
    .user-name {
      font-size: 16px;
      line-height: 16px;
    }
    .logout {
      font-size: 16px;
      line-height: 16px;
      margin-left: 16px;
    }
  }
}
.content {
  display: flex;
  flex-grow: 1;
  .sidebar-menu {
    width: 200px;
    height: 100%;
    background: #ffffff;
    /* box-shadow-light */

    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  }
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 20px 24px;
    background: #f0f2f5;

    overflow-y: auto;
    overflow-x: hidden;
    .breadcrumb-card {
      width: 100%;
      margin-bottom: 24px;
    }
  }
}
</style>
