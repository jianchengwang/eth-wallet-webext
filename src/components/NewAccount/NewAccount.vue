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
            v-model="formData.confirmPassword"
            style="margin-top: 20px"
          />

          <var-button
            block
            type="warning"
            :disabled="
              !!formData.password &&
              formData.password === formData.confirmPassword
                ? false
                : true
            "
            size="large"
            style="
              font-size: 18px;
              margin-top: 48px;
              padding-top: 16px;
              padding-bottom: 16px;
            "
            @click="createAccount"
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
            margin-top: 18px;
            padding-top: 16px;
            padding-bottom: 16px;
          "
          >导入账户</var-button
        >
      </var-col>
    </var-row>

    <var-dialog
      v-model:show="showMnemonic"
      :cancel-button="false"
      confirm-button-text="复制助记词"
      @confirm="copyMnemonic"
    >
      <template #title>
        <var-icon name="information" color="#2979ff" />
        助记词
      </template>

      <var-card title="" :description="mnemonic" />
    </var-dialog>
  </div>
</template>

<script lang="ts">
import { ref, reactive } from "vue";
import { useClipboard } from "@vueuse/core";
import { Account } from "~/scripts/types/Account";
import { createWallet } from "~/scripts/lib/wallet";
import { aesEncrypt } from "~/scripts/lib/crypto";
import { accounts, currentAccount, unlocked } from "~/logic/storage";
export default {
  setup() {
    const formData = reactive({
      password: "",
      confirmPassword: "",
    });
    let showMnemonic = ref(false);
    let mnemonic = ref("");
    let account = reactive<Account>({
      name: "Account1",
      address: "",
      publicKey: "",
      mnemonicCiphertext: "",
      privateKeyCiphertext: "",
    });
    const createAccount = () => {
      const wallet = createWallet();
      mnemonic.value = wallet.mnemonic.phrase;
      const mnemonicCiphertext = aesEncrypt(mnemonic.value, formData.password);
      const privateKeyCiphertext = aesEncrypt(
        wallet.privateKey,
        formData.password
      );
      account = Object.assign(account, {
        name: "Account1",
        address: wallet.address,
        publicKey: wallet.publicKey,
        mnemonicCiphertext: mnemonicCiphertext,
        privateKeyCiphertext: privateKeyCiphertext,
      });
      showMnemonic.value = true;
    };
    const copyMnemonic = () => {
      useClipboard({ source: mnemonic });
      showMnemonic.value = false;
      accounts.value.push(account);
      currentAccount.value = account;
      unlocked.value = true;
    };
    return {
      formData,
      showMnemonic,
      mnemonic,
      account,
      createAccount,
      copyMnemonic,
    };
  },
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
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.title {
  font-size: 20px;
  margin-top: 8px;
}
</style>
