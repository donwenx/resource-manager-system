<template>
  <Layout>
    <div class="download">
      <el-card>
        <Table
          :tableData="tableData"
          :isDownload="true"
          :pageSize="pageSize"
          @handleDownLoad="handleDownLoad"
          @sizeChange="handleSizeChange"
          @currentChange="handleCurrentChange"
          :totalPage="count"
          @searchChange="handleSearchChange"
        ></Table>
      </el-card>
    </div>
  </Layout>
</template>

<script>
import Layout from "../layout/Layout.vue";
import Table from "@/components/Table.vue";
import { resourceList } from "@/js/service.js";
import { TOKEN } from '@/js/config.js';
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
      this.count = res.count;
      console.log("resourceList", this.tableData);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.createResourceList();
    },
    handleSearchChange(keyword) {
      this.keyword = keyword;
      this.createResourceList();
    },
    async handleDownLoad(row) {
      // console.log("下载", row.rid);
      const token = window.localStorage.getItem(TOKEN);
      window.location.href = `/api/resource/download?rid=${row.rid}&token=${token}`;
      setTimeout(() => {
        this.createResourceList();
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.download {
  width: 100%;
}
</style>
