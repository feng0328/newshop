<template>
  <div class="wrap-login">
    <el-form class="form-login" label-position="top" label-width="400px" :model="formdata">
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button type="primary" class="btn-login" @click="userLogin()">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formdata: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async userLogin() {
      const res = await this.$http.post(`login`, this.formdata);
      const {
        data: {
          data: { token },
          meta: { msg, status }
        }
      } = res;
      // console.log(res);
      if (status === 200) {
        localStorage.setItem("token", token);
        this.$router.push({
          name: "home"
        });
      } else {
        this.$message.error(msg);
      }
    }
  }
};
</script>

<style>
.wrap-login {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-login {
  background-color: #fff;
  width: 400px;
  padding: 30px;
  border-radius: 5px;
}
.btn-login {
  width: 100%;
}
</style>
