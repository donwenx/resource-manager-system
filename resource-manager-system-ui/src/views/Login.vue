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
        <el-form-item label="密码" prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            type="password"
            v-model="ruleForm.password"
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
import { login } from "@/js/service.js";
export default {
  data() {
    return {
      ruleForm: {
        id: "",
        password: "",
      },
      rules: {
        id: [{ required: true, message: "请输入id", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate( async (valid) => {
        if (valid) {
          const data = {
            uid: this.ruleForm.id,
            password: this.ruleForm.password,
          };
          const res = await login(data);
          this.$router.push('/');
          console.log(res);
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