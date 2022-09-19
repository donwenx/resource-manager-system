<template>
  <div class="login-content">
    <div class="left">
      <img src="@/assets/login-banner.svg" alt="" />
    </div>
    <div class="right">
      <div class="title">资源管理系统</div>
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.login-content {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  background-color: #fff;
  .left {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #7aa9ff;
    img {
      transform: scale(0.8);
      transform: translateY(-20px);
    }
  }
  .right {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 24px;

    .title {
      font-size: 40px;
      font-weight: 400;
      margin-bottom: 46px;
    }
  }
}
</style>