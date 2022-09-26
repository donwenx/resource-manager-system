<template>
  <Layout>
    <div class="resourceAdminList">
      <el-card>
        <Table
          :tableData="tableData"
          :isDownload="false"
          :pageSize="pageSize"
          @handleDownLoad="handleDownLoad"
          @sizeChange="handleSizeChange"
          @currentChange="handleCurrentChange"
          :totalPage="count"
          @searchChange="handleSearchChange"
          @handleEditUpdate="handleEditUpdate"
          @handleDelete="handleDelete"
          @handleAudit="handleAudit"
        ></Table>
      </el-card>
    </div>
  </Layout>
</template>

<script>
import Layout from '@/layout/Layout.vue';
import Table from '@/components/Table.vue';
import { resourceAdminList, resourceAdminUpdate } from '@/js/service/index';

export default {
  components: {
    Layout,
    Table,
  },
  data() {
    return {
      tableData: [],
      pageSize: 5,
      currentPage: 1,
      count: 0,
      keyword: '',
    };
  },
  async created() {
    this.getResourceList();
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.getResourceList();
    },
    async getResourceList() {
      // 计算开始页 = 单前页码 * 每页多少条
      const skip = (this.currentPage - 1) * this.pageSize;
      // 取多少条数据
      const take = this.pageSize;
      const keyword = this.keyword;
      const data = {
        skip,
        take,
        keyword,
      };
      const res = await resourceAdminList(data);
      this.tableData = res.data;
      this.count = res.count;
      // console.log("resourceAdminList", this.tableData);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getResourceList();
    },
    handleSearchChange(keyword) {
      this.keyword = keyword;
      this.getResourceList();
    },
    handleDownLoad(row) {
      // console.log("下载", row.rid);
      window.location.href = `/api/resource/download?rid=${row.rid}`;
    },
    // 更新文件信息
    async handleEditUpdate(data) {
      await resourceAdminUpdate(data);
      // console.log("update文件信息", res);
      this.$message({
        message: '文件修改成功！',
        type: 'success',
      });
      this.getResourceList();
    },
    handleDelete(rid) {
      const data = { rid, state: 0 };
      resourceAdminUpdate(data);
      this.$message({
        message: '文件删除成功！',
        type: 'success',
      });
      console.log('删除资源', rid);
      this.getResourceList();
    },
    // 审核
    handleAudit(row) {
      const data = { rid: row.rid, state: row.state };
      resourceAdminUpdate(data);
      this.$message({
        type: 'success',
        message: '状态成功！',
      });
      this.getResourceList();
    },
  },
};
</script>

<style lang="scss" scoped>
.resourceAdminList {
  width: 100%;
}
</style>
