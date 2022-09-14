<template>
  <Layout>
    <div class="download">
      <el-card>
        <Table></Table>
      </el-card>
    </div>
  </Layout>
</template>

<script>
import Layout from "../layout/Layout.vue";
import Table from "@/components/Table.vue";
export default {
  components: {
    Layout,
    Table,
  },
  data() {
    return {
      downloadInfo: {
        title: '资源搜索',
        tableInfo: {
          name: [
            '资源名称',
            '上传时间',
            '关键字',
            '下载量',
            '操作',
          ]
        }
      }
    };
  },
};
</script>

<style lang="scss" scoped>
.download {
  width: 100%;
}
</style>
