<template>
  <Layout>
    <div class="upload">
      <el-card class="upload-card">
        <div slot="header">
          <el-form
            label-position="left"
            label-width="80px"
            :model="formLabelAlign"
            :rules="rules"
          >
            <el-form-item label="文件分类">
              <el-input v-model="formLabelAlign.type"></el-input>
            </el-form-item>

            <el-form-item label="文件名称" prop="name">
              <el-input v-model="formLabelAlign.name"></el-input>
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
import { upload } from "@/js/service.js";
export default {
  components: {
    Layout,
  },
  data() {
    return {
      formLabelAlign: {
        name: "",
        type: "",
      },
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
      this.formLabelAlign.name = file.name;
      // console.log("http-request", e);
    },
    async handleUpload() {
      this.formData.append("name", this.formLabelAlign.name);
      const res = await upload(this.formData);
      console.log(res);
      this.$message({
        message: "文件上传成功！",
        type: "success",
      });
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
