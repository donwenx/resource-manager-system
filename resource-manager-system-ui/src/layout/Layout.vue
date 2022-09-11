<template>
  <div>
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
        <div class="user-name">小玟同学</div>
      </div>
    </div>
    <div class="sidebar">
      
    </div>
    <div class="main">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  }
}
</style>
