<template>
  <div>
    <div class="table-head">
      <div class="title">资源搜索</div>
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="keyword"
      >
      </el-input>
      <el-button type="primary" @click="handleSearchChange">搜索</el-button>
    </div>
    <div class="main">
      <el-table stripe :data="tableData" style="width: 100%">
        <el-table-column label="资源名称" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="上传时间" width="200">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{
              dateFormat(scope.row.time)
            }}</span>
          </template>
        </el-table-column>

        <el-table-column label="关键字" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.keywords }}</span>
          </template>
        </el-table-column>

        <el-table-column label="分类名" width="100">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              scope.row.category ? scope.row.category.name : ""
            }}</span>
          </template>
        </el-table-column>

        <el-table-column label="下载量" width="180">
          <template slot-scope="scope">
            <i class="el-icon-download"></i>
            <span style="margin-left: 10px">{{ scope.row.downloads }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="isDownload"
              size="mini"
              type="success"
              @click="handleDownLoad(scope.$index, scope.row)"
              >下载</el-button
            >
            <el-button
              v-if="!isDownload"
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              v-if="!isDownload"
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="table-pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="sizes, prev, pager, next"
          :total="totalPage"
        >
        </el-pagination>
      </div>
    </div>

    <div class="table-dialog">
      <el-dialog title="资源文件" :visible.sync="dialogFormVisible">
        <el-form :model="form" label-position="left">
          <el-form-item label="文件名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="关键字" :label-width="formLabelWidth">
            <el-input v-model="form.keywords" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleEditUpdate()"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {
    tableData: Array,
    isDownload: Boolean,
    pageSize: Number,
    totalPage: Number,
  },
  data() {
    return {
      keyword: "",
      dialogFormVisible: false,
      form: {
        name: "",
        img: "",
        state: 1,
        keywords: "",
      },
      formLabelWidth: "120px",
      currentPage: 1,
      rid: 0,
    };
  },
  methods: {
    handleDownLoad(index, row) {
      // console.log("handleDownLoad", index, row);
      this.$emit("handleDownLoad", row);
    },
    handleEdit(index, row) {
      console.log(index, row.rid);
      // 每次点编辑就保存一下rid
      this.rid = row.rid;
      this.dialogFormVisible = true;
    },
    handleDelete(index, row) {
      // console.log(index, row.rid);
      this.$emit("handleDelete", row.rid);
    },
    // 编辑文件
    handleEditUpdate() {
      this.dialogFormVisible = false;
      const data = {
        rid: this.rid,
        ...this.form,
      };
      // console.log(data);
      this.$emit("handleEditUpdate", data);
    },
    // 分页
    handleSizeChange(val) {
      this.$emit("sizeChange", val);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.$emit("currentChange", val);
      console.log(`当前页: ${val}`);
    },
    handleSearchChange() {
      this.$emit("searchChange", this.keyword);
    },
    dateFormat(time) {
      return moment(time * 1000).format("YYYY-MM-DD hh:mm:ss");
    },
  },
};
</script>

<style lang="scss" scoped>
.table-head {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  gap: 18px;
  .el-input {
    width: 240px;
  }
}
.table-pagination {
  display: flex;
  align-content: center;
  width: 100%;
  margin-top: 16px;
}
</style>