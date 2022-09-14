<template>
  <div class="login">
    <BrandCard>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
        class="ruleForm"
        label-position="left"
      >
        <el-form-item label="ID" prop="id">
          <el-input
            prefix-icon="el-icon-user"
            v-model="ruleForm.id"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            prefix-icon="el-icon-lock"
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="button"
            type="primary"
            @click="submitForm('ruleForm')"
            >登录</el-button
          >
          <el-button type="text" @click="resetForm()">注册</el-button>
        </el-form-item>
      </el-form>
    </BrandCard>
  </div>
</template>

<script>
import BrandCard from "@/components/BrandCard.vue";
export default {
  data() {
    return {
      ruleForm: {
        pass: "",
        id: "",
      },
      rules: {
        id: [{ required: true, message: "请输入id", trigger: "blur" }],
        pass: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$router.push("/register");
    },
  },
  components: {
    BrandCard,
  },
  created() {
    this.ruleForm.id = this.$route.query.id;
  },
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
  .button {
    width: 160px;
  }
}
</style>