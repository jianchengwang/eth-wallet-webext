<template>
  <div class="container">
    <var-row>
      <var-col :span="24">
        <var-icon
          name="/assets/metamask-fox.svg"
          :size="64"
          style="margin-top: 24px"
        />
      </var-col>
    </var-row>
    <var-row>
      <var-col :span="24">
        <p class="title1">欢迎回来！</p>
        <p class="title2">即将进入去中心化网络</p>
      </var-col>
    </var-row>
    <var-row>
      <var-col :span="24">
        <var-form ref="form" style="margin: 40px">
          <var-input
            type="password"
            placeholder="输入密码*"
            :rules="[(v) => !!v || '密码不能为空']"
            v-model="formData.password"
          />

          <var-button
            block
            type="success"
            size="large"
            style="
              font-size: 18px;
              margin-top: 58px;
              padding-top: 16px;
              padding-bottom: 16px;
            "
            >解锁</var-button
          >
        </var-form>
      </var-col>
    </var-row>
    <var-row>
      <var-col :span="24">
        or
        <span style="color: #037dd6"
          >import using Secret Recovery Phrase</span
        ></var-col
      >
    </var-row>
  </div>
</template>

<script lang="ts">
export default {
  setup() {
    const formData = reactive({
      password: "",
    });
    return {
      formData,
    };
  },
};
</script>

<style scoped>
.container {
  /* display: flex; */
  /* margin: 24px; */
  text-align: center;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
}

.title1 {
  font-weight: bold;
  font-size: 36px;
  margin-top: 28px;
}
.title2 {
  font-weight: 200;
  font-size: 18px;
  margin-top: 10px;
}
</style>
