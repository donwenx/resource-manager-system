<template>
  <Layout>
    <div class="resourceList">
      <el-card>
        <Table
          :tableData="tableData"
          :isDownload="false"
          :pageSize="pageSize"
          @handleDownLoad="handleDownLoad"
          @sizeChange="handleSizeChange"
          @currentChange="handleCurrentChange"
          :totalPage="totalPage"
          @searchChange="handleSearchChange"
          @handleEditUpdate="handleEditUpdate"
          @handleDelete="handleDelete"
        ></Table>
      </el-card>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/layout/Layout.vue";
import Table from "@/components/Table.vue";
import { resourceList, resourceUpdate } from "@/js/service.js";
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
      totalPage: 100,
      keyword: "",
    };
  },
  async created() {
    this.createResourceList();
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.createResourceList();
    },
    async createResourceList() {
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
      const res = await resourceList(data);
      this.tableData = res.data;
      // console.log("resourceList", this.tableData);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.createResourceList();
    },
    handleSearchChange(keyword) {
      this.keyword = keyword;
      this.createResourceList();
    },
    handleDownLoad(row) {
      // console.log("下载", row.rid);
      window.location.href = `/api/resource/download?rid=${row.rid}`;
    },
    // 更新文件信息
    async handleEditUpdate(data) {
      await resourceUpdate(data);
      // console.log("update文件信息", res);
      this.$message({
        message: "文件修改成功！",
        type: "success",
      });
      this.createResourceList();
    },
    handleDelete(rid) {
      const data = { rid, state: 0 };
      resourceUpdate(data);
      this.$message({
        message: "文件删除成功！",
        type: "success",
      });
      console.log("删除资源", rid);
      this.createResourceList();
    },
  },
};
</script>

<style lang="scss" scoped>
.resourceList {
  width: 100%;
}
</style>
