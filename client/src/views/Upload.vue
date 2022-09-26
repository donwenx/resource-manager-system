<template>
  <Layout>
    <div class="upload">
      <el-card class="upload-card">
        <div slot="header">
          <el-form
            label-position="left"
            label-width="80px"
            :model="form"
            :rules="rules"
          >
            <el-form-item label="文件分类"
              ><el-select
                v-model="form.cid"
                filterable
                remote
                reserve-keyword
                placeholder="请输入关键词"
                :remote-method="remoteMethod"
                :loading="loading"
              >
                <el-option
                  v-for="item in options"
                  :key="item.cid"
                  :label="item.name"
                  :value="item.cid"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="文件名称" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            :limit="1"
            :http-request="httpRequest"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <!-- <div class="el-upload__tip" slot="tip">
              只能上传jpg/png文件，且不超过500kb
            </div> -->
          </el-upload>
          <el-button
            @click="handleUpload()"
            class="upload-button"
            type="primary"
            >保存</el-button
          >
        </div>
      </el-card>
    </div>
  </Layout>
</template>

<script>
import Layout from "../layout/Layout.vue";
import { upload, getCategoryList } from "@/js/service/index";
export default {
  components: {
    Layout,
  },
  data() {
    return {
      form: {
        name: "",
        cid: "",
      },
      options: [],
      loading: false,
      rules: {
        name: [{ required: true, message: "请输入文件名", trigger: "blur" }],
      },
      formData: {},
    };
  },
  methods: {
    httpRequest(e) {
      const file = e.file;
      this.formData = new FormData();
      this.formData.append("file", file);
      this.form.name = file.name;
      // console.log("http-request", e);
    },
    async handleUpload() {
      this.formData.append("name", this.form.name);
      this.formData.append("cid", this.form.cid);
      const res = await upload(this.formData);
      console.log(res);
      this.$message({
        message: "文件上传成功！",
        type: "success",
      });
    },
    async remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        this.options = await this.getCategoryInfoList(query);
        this.loading = false;
      } else {
        this.options = [];
      }
    },
    async getCategoryInfoList(query) {
      // 计算开始页 = 单前页码 * 每页多少条
      const skip = 0;
      // 取多少条数据
      const take = 100;
      const keyword = query;
      const data = {
        skip,
        take,
        keyword,
      };
      const res = await getCategoryList(data);
      return res.data.data;
      // console.log(res);
    },
  },
};
</script>

<style lang="scss" scoped>
.upload {
  width: 100%;
}
.upload-button {
  margin-top: 16px;
  width: 200px;
}
</style>
