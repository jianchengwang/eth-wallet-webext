<template>
  <div class="container">
    <var-row>
      <var-col :span="24">
        <var-icon name="/assets/images/logo/metamask-fox.svg" :size="64" />
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
        <var-form ref="form" style="margin: 50px;">
          <var-input
            type="password"
            placeholder="密码"
            :rules="[(v) => !!v || '密码不能为空']"
            v-model="formData.password"
          />

          <var-button
            block
            type="success"
            size="large"
            style="
              font-size: 18px;
              margin-top: 48px;
              padding-top: 16px;
              padding-bottom: 16px;
            "
            @click="unlock"
          >解锁</var-button>
        </var-form>
      </var-col>
    </var-row>
    <var-row>
      <var-col :span="24">
        or
        <span style="color: #037dd6">import using Secret Recovery Phrase</span>
      </var-col>
    </var-row>
  </div>
</template>

<script setup lang="ts">
import { importPrivateKey } from "~/scripts/lib/wallet";
import { aesDecrypt } from "~/scripts/lib/crypto";
import { accounts, unlocked } from "~/logic/storage";

const formData = reactive({
  password: "",
});

const unlock = () => {
  const account1 = accounts.value[0];
  const privateKey = aesDecrypt(
    account1.privateKeyCiphertext,
    formData.password
  );
  alert(privateKey);
  const wallet = importPrivateKey(privateKey);
  alert(wallet.address);
  if (wallet && wallet.address === account1.address) {
    unlocked.value = true;
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  flex: 1 0 auto;
  min-height: 0;
  width: 100%;
  flex-direction: column;
  text-align: center;
  border-radius: 20px;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.title1 {
  font-weight: bold;
  font-size: 36px;
  margin-top: 20px;
}
.title2 {
  color: darkgray;
  font-weight: 200;
  font-size: 16px;
  margin-top: 5px;
}
</style>
