<template>
  <div class="container">
    <var-row>
      <var-col :span="24">
        <var-icon name="account-circle" :size="40" color="#f50057" />
      </var-col>
    </var-row>
    <var-row>
      <var-col :span="24">
        <p class="title">导入账号</p>
      </var-col>
    </var-row>
    <var-row>
      <var-col :span="24">
        <var-form ref="form" style="margin: 20px">
          <var-select :hint="false" :line="false" placeholder="请选择一个选项" v-model="importType">
            <var-option label="助记词" :value="1" />
            <var-option label="私钥" :value="2" />
            <var-option label="json文件" :value="3" />
          </var-select>
          <var-input
            v-if="importType == 1"
            type="input"
            placeholder="输入助记词*"
            :rules="[(v) => !!v || '助记词不能为空']"
            v-model="formData.monic"
            style="margin-top: 20px"
          />
          <var-input
            v-if="importType == 2"
            type="input"
            placeholder="输入钱包私钥*"
            :rules="[(v) => !!v || '钱包私钥不能为空']"
            v-model="formData.privateKey"
            style="margin-top: 20px"
          />
          <var-input
            v-if="importType == 3"
            type="password"
            placeholder="json文件密码*"
            :rules="[(v) => !!v || 'json文件密码不能为空']"
            v-model="formData.keystorePassword"
            style="margin-top: 20px"
          />
          <var-uploader
            v-if="importType == 3"
            v-model="jsonFile"
            @after-read="handleAfterRead"
            :maxlength="1"
            style="margin-top: 20px"
          />
          <var-input
            type="password"
            placeholder="设置密码*"
            :rules="[(v) => !!v || '密码不能为空']"
            v-model="formData.password"
            style="margin-top: 20px"
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
            @click="importAccount"
          >导入</var-button>
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
          @click="exportKeystoreJson1"
        >导出json文件</var-button>
      </var-col>
    </var-row>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useClipboard } from "@vueuse/core";
import { Account } from "~/scripts/types/Account";
import { importMonic, importPrivateKey, importKeystoreJson, exportKeystoreJson } from "~/scripts/lib/wallet";
import { aesEncrypt } from "~/scripts/lib/crypto";
import { accounts, currentAccount, unlocked } from "~/logic/storage";
const formData = reactive({
  monic: "",
  privateKey: "",
  keystoreJson: "",
  keystorePassword: "",
  password: "",
  confirmPassword: "",
});
let importType = ref(1);
const jsonFile = ref([])
const handleAfterRead = event => {
  console.info(event)
  const reader = new FileReader()
  reader.readAsText(event.file, "UTF-8");
  reader.onload = function (ev) {
    formData.keystoreJson = ev.target.result;
  };
}
let account = reactive<Account>({
  name: "",
  address: "",
  publicKey: "",
  mnemonic: "",
  mnemonicCiphertext: "",
  privateKey: "",
  privateKeyCiphertext: "",
});
const importAccount = () => {
  let wallet
  if (importType.value == 1) {
    wallet = importMonic(formData.monic)
  } else if (importType.value == 2) {
    wallet = importPrivateKey(formData.privateKey)
  } else {
    wallet = importKeystoreJson(formData.keystoreJson, formData.keystorePassword)
  }
  let mnemonic = wallet.mnemonic ? wallet.mnemonic.phrase : ""
  const mnemonicCiphertext = aesEncrypt(mnemonic, formData.password);
  const privateKeyCiphertext = aesEncrypt(
    wallet.privateKey,
    formData.password
  );
  account = Object.assign(account, {
    name: "Account" + accounts.value.length,
    address: wallet.address,
    publicKey: wallet.publicKey,
    mnemonic: mnemonic,
    mnemonicCiphertext: mnemonicCiphertext,
    privateKey: wallet.privateKey,
    privateKeyCiphertext: privateKeyCiphertext,
  });
  accounts.value.push(account);
};

const exportKeystoreJson1 = () => {
  exportKeystoreJson(formData.privateKey, formData.password).then(result => { alert(result); })
}
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

.title {
  font-size: 20px;
  margin-top: 8px;
}
</style>
