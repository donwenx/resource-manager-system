<template>
  <Layout>
    <div class="home">
      <el-card class="list" v-for="item in statistics" :key="item.id">
        <div slot="header" class="header">{{item.title}}</div>
        <div class="content">
          <div class="left">
            <div class="name">{{item.number}}</div>
            <div class="title">{{item.subtitle}}</div>
          </div>
          <div class="right">
            <img :src="item.img" alt="" srcset="" />
          </div>
        </div>
      </el-card>
    </div>
  </Layout>
</template>

<script>
import Layout from "../layout/Layout.vue";
import DownloadIcon from "../assets/icon-download.svg";
import DiskIcon from "../assets/icon-disk.svg";
import UsersIcon from "../assets/icon-users.svg";

export default {
  name: "Home",
  components: {
    Layout,
  },
  data() {
    return {
      statistics: [
        {id: 1, title: '下载数量', number: 2000, subtitle: '总下载量', img: DownloadIcon },
        {id: 2, title: '磁盘占用', number: 2000, subtitle: '总占用量', img: DiskIcon },
        {id: 3, title: '用户数量', number: 2000, subtitle: '总用户量', img: UsersIcon },
      ]
    }
  },
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  width: 100%;
  justify-content: space-between;
  .list {
    width: 30%;
    .header {
      font-size: 24px;
      font-weight: 600;
    }

    .content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        display: flex;
        height: 96px;
        flex-direction: column;
        justify-content: space-between;
        .name {
          font-size: 40px;
          font-weight: 600;
        }
        .title {
          font-size: 24px;
        }
      }
    }
  }
}
</style>
