<template>
  <Layout>
    <div class="upload">
      <el-card class="upload-card">
        <div slot="header">
          <el-form
            label-position="left"
            label-width="80px"
            :model="formLabelAlign"
          >
            <el-form-item label="文件分类">
              <el-input v-model="formLabelAlign.type"></el-input>
            </el-form-item>

            <el-form-item label="文件名称">
              <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <!-- <div class="el-upload__tip" slot="tip">
              只能上传jpg/png文件，且不超过500kb
            </div> -->
          </el-upload>
          <el-button class="upload-button" type="primary">保存</el-button>
        </div>
      </el-card>
    </div>
  </Layout>
</template>

<script>
import Layout from "../layout/Layout.vue";
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
    };
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
