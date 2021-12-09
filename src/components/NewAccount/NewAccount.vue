<template>
  <div class="container">
    <var-row>
      <var-col :span="24">
        <var-icon name="account-circle" :size="40" color="#f50057" />
      </var-col>
    </var-row>
    <var-row>
      <var-col :span="24">
        <p class="title">创建一个新账号</p>
      </var-col>
    </var-row>
    <var-row>
      <var-col :span="24">
        <var-form ref="form" style="margin: 20px">
          <var-input
            type="password"
            placeholder="设置密码*"
            :rules="[(v) => !!v || '密码不能为空']"
            v-model="formData.password"
          />
          <var-input
            type="password"
            placeholder="请确认输入密码*"
            :rules="[
              (v) => (!!v && v === formData.password) || '两次密码不一致',
            ]"
            v-model="formData.checkPassword"
            style="margin-top: 20px"
          />

          <var-button
            block
            type="warning"
            size="large"
            style="
              font-size: 18px;
              margin-top: 48px;
              padding-top: 16px;
              padding-bottom: 16px;
            "
            >创建</var-button
          >
        </var-form>
      </var-col>
    </var-row>
    <var-row>
      <var-col :span="24">
        <var-button
          style="
            font-size: 18px;
            margin-top: 28px;
            padding-top: 16px;
            padding-bottom: 16px;
          "
          >导入账户</var-button
        >
      </var-col>
    </var-row>
  </div>
</template>

<script lang="ts">
export default {
  setup() {
    const formData = reactive({
      password: "",
      checkPassword: "",
    });
    return {
      formData,
    };
  },
};
</script>

<style scoped>
.container {
  /* margin: 24px;
  display: flex; */
  align-items: center;
  flex-direction: column;
}

.title {
  font-size: 20px;
  margin-top: 8px;
}
</style>
