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
      </div>
      <div class="main">
        <el-table stripe :data="tableData" style="width: 100%">
          <el-table-column label="用户ID" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.uid }}</span>
            </template>
          </el-table-column>

          <el-table-column label="用户名称" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column label="性别" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.sex }}</span>
            </template>
          </el-table-column>

          <el-table-column label="权限" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.authority }}</span>
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
      <el-dialog title="资源文件" :visible.sync="dialogFormVisible">
        <el-form :model="form" label-position="left">
          <el-form-item label="用户名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-select v-model="form.sex" placeholder="请选择">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
              <el-option label="未知" value="未知"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="权限" :label-width="formLabelWidth">
            <el-select v-model="form.authority" placeholder="请选择">
              <el-option label="超级管理员" value="超级管理员"></el-option>
              <el-option label="普通用户" value="普通用户"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="form.password" autocomplete="off"></el-input>
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
  </Layout>
</template>

<script>
import Layout from "../layout/Layout.vue";
import moment from "moment";
import { userInfoList, supUserUpdate } from "@/js/service/index";
export default {
  components: {
    Layout,
  },
  data() {
    return {
      keyword: "",
      dialogFormVisible: false,
      form: {
        name: "",
        sex: "",
        authority: "",
        password: "",
        state: 1,
        uid: 0,
      },
      formLabelWidth: "120px",
      currentPage: 1,
      count: 0,
      pageSize: 5,
      tableData: [],
    };
  },
  created() {
    this.getUserInfoList();
  },
  methods: {
    async getUserInfoList() {
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
      const res = await userInfoList(data);
      this.tableData = res.data.data;
      this.count = res.data.count;
      // console.log(res);
    },
    handleEdit(index, row) {
      console.log(index, row.rid);
      // 每次点编辑就保存一下rid
      this.dialogFormVisible = true;
      this.form.uid = row.uid;
      this.form.name = row.name;
      this.form.sex = row.sex;
      this.form.password = row.password;
      this.form.authority = row.authority;
    },
    handleDelete(index, row) {
      const data = { uid: row.uid, state: 2 };
      supUserUpdate(data);
      this.$message({
        message: "用户删除成功！",
        type: "success",
      });
      console.log("删除用户！", row.uid);
      this.getUserInfoList();
    },
    // 编辑文件
    async handleEditUpdate() {
      this.dialogFormVisible = false;
      const data = this.form;
      // console.log(data);
      const res = await supUserUpdate(data);
      console.log(res);
      if (res.code === 0) {
        this.$message({
          message: "用户修改成功！",
          type: "success",
        });
      }

      this.getUserInfoList();
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getUserInfoList();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getUserInfoList();
      console.log(`当前页: ${val}`);
    },
    handleSearchChange() {
      this.getUserInfoList();
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
