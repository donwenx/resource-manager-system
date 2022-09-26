<template>
  <div class="register">
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
        <el-form-item label="用户名" prop="name">
          <el-input
            prefix-icon="el-icon-user"
            v-model="ruleForm.name"
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
            type="success"
            @click="submitForm('ruleForm')"
            >注册</el-button
          >
          <el-button type="text" @click="resetForm()">登录</el-button>
        </el-form-item>
      </el-form>
    </BrandCard>
  </div>
</template>

<script>
import BrandCard from "@/components/BrandCard.vue";
import { register } from "@/js/service/index";
export default {
  data() {
    return {
      ruleForm: {
        password: "",
        name: "",
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await register(this.ruleForm);
          if (res.code === 0) {
            this.$router.push({
              name: "login",
              query: { id: res.data },
            });
          }
          this.$message({
          message: '恭喜你，你已经注册成功了!',
          type: 'success'
        });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$router.push("/login");
    },
  },
  components: {
    BrandCard,
  },
};
</script>

<style lang="scss" scoped>
.register {
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