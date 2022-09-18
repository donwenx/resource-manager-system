<template>
  <Layout>
    <el-card class="userList">
      <div slot="header" class="table-head">
        <div class="title">资源搜索</div>
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="keyword"
        >
        </el-input>
        <el-button type="primary" @click="handleSearchChange">搜索</el-button>
        <div class="right">
          <el-button type="success" @click="handleCreateChange"
            >创建分类</el-button
          >
        </div>
      </div>
      <div class="main">
        <el-table stripe :data="tableData" style="width: 100%">
          <el-table-column label="分类ID" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.cid }}</span>
            </template>
          </el-table-column>

          <el-table-column label="分类名称" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
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
            :total="count"
          >
          </el-pagination>
        </div>
      </div>
    </el-card>
    <div class="table-dialog">
      <el-dialog title="分类修改" :visible.sync="dialogFormVisible">
        <el-form :model="form" label-position="left">
          <el-form-item label="分类名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleEditUpdate()"
            >确 定</el-button
          >
        </div>
      </el-dialog>

      <el-dialog title="创建分类" :visible.sync="dialogCategoryCreateVisible">
        <el-form
          ref="edit"
          :rules="rules"
          :model="categoryForm"
          label-position="left"
        >
          <el-form-item
            label="分类名称"
            :label-width="formLabelWidth"
            prop="name"
          >
            <el-input v-model="categoryForm.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogCategoryCreateVisible = false"
            >取 消</el-button
          >
          <el-button type="primary" @click="handleCategoryCreate()"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
  </Layout>
</template>

<script>
import Layout from "../layout/Layout.vue";
import moment from "moment";
import {
  categoryCreate,
  getCategoryList,
  categoryUpdate,
} from "@/js/service.js";
export default {
  components: {
    Layout,
  },
  data() {
    return {
      keyword: "",
      dialogFormVisible: false,
      dialogCategoryCreateVisible: false,
      form: {
        name: "",
        state: 1,
        cid: 0,
      },
      rules: {
        name: [{ required: true, message: "请输入分类名", trigger: "blur" }],
      },
      categoryForm: {
        // 创建分类的表单
        name: "",
      },
      formLabelWidth: "120px",
      currentPage: 1,
      count: 0,
      pageSize: 5,
      tableData: [],
    };
  },
  created() {
    this.getCategoryInfoList();
  },
  methods: {
    async getCategoryInfoList() {
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
      const res = await getCategoryList(data);
      this.tableData = res.data.data;
      this.count = res.data.count;
      // console.log(res);
    },
    handleCreateChange() {
      this.dialogCategoryCreateVisible = true;
    },
    // 创建分类方法
    async handleCategoryCreate() {
      this.dialogCategoryCreateVisible = false;
      this.$refs.edit.validate(async (valid) => {
        if (valid) {
          const data = this.categoryForm;
          // console.log(data);
          const res = await categoryCreate(data);
          // console.log(res);
          if (res.code === 0) {
            this.$message({
              message: "分类创建成功！",
              type: "success",
            });
          }
          this.getCategoryInfoList();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleEdit(index, row) {
      console.log(index, row.rid);
      // 每次点编辑就保存一下rid
      this.dialogFormVisible = true;
      this.form.cid = row.cid;
      this.form.name = row.name;
    },
    handleDelete(index, row) {
      const data = { cid: row.cid, state: 2 };
      categoryUpdate(data);
      this.$message({
        message: "分类删除成功！",
        type: "success",
      });
      console.log("删除分类！", row.cid);
      this.getCategoryInfoList();
    },
    // 编辑文件
    async handleEditUpdate() {
      this.dialogFormVisible = false;
      const data = this.form;
      // console.log(data);
      const res = await categoryUpdate(data);
      console.log(res);
      if (res.code === 0) {
        this.$message({
          message: "分类修改成功！",
          type: "success",
        });
      }

      this.getCategoryInfoList();
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getCategoryInfoList();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getCategoryInfoList();
      console.log(`当前页: ${val}`);
    },
    handleSearchChange() {
      this.getCategoryInfoList();
    },
    dateFormat(time) {
      return moment(time * 1000).format("YYYY-MM-DD hh:mm:ss");
    },
  },
};
</script>

<style lang="scss" scoped>
.userList {
  width: 100%;
}
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
