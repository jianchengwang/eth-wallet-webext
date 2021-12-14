<template>
  <div>创建钱包</div>
  <div>
    密码
    <input name="password" v-model="formData.password" type="password" />
  </div>
  <div>
    确认密码
    <input name="confirmPassword" v-model="formData.confirmPassword" type="password" />
  </div>
  <input type="checkbox" v-model="formData.agreeTermsOfUse" />阅读条款
  <a @click="showTermsOfUse = !showTermsOfUse;">使用条款</a>
  <div v-if="showTermsOfUse">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.</p>
    <button @click="showTermsOfUse = false;">取消</button>|
    <button @click="showTermsOfUse = false; formData.agreeTermsOfUse = true;">同意</button>
  </div>
  <div>
    <button @click="create">创建账号</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

import { Account } from "~/scripts/types/Account";
import { createWallet } from "~/scripts/lib/wallet";
import { aesEncrypt } from "~/scripts/lib/crypto";
import { accounts, currentAccount, unlocked } from "~/logic/storage";

const router = useRouter()

const formData = reactive({
  password: '',
  confirmPassword: '',
  agreeTermsOfUse: false
})
const showTermsOfUse = ref(false)

const create = () => {
  if (formData.password != formData.confirmPassword) {
    alert('密码不一致')
    return
  }
  if (!formData.agreeTermsOfUse) {
    alert('请勾选使用条款')
    return
  }
  const wallet = createWallet();
  let mnemonic = wallet.mnemonic ? wallet.mnemonic.phrase : "";
  const mnemonicCiphertext = wallet.mnemonic ? aesEncrypt(mnemonic, formData.password) : "";
  const privateKeyCiphertext = aesEncrypt(
    wallet.privateKey,
    formData.password
  );
  let account: Account = {
    name: "Account" + (accounts.value.length + 1),
    address: wallet.address,
    publicKey: wallet.publicKey,
    mnemonic: mnemonic,
    mnemonicCiphertext: mnemonicCiphertext,
    privateKey: wallet.privateKey,
    privateKeyCiphertext: privateKeyCiphertext,
  }
  accounts.value.push(account);
  currentAccount.value = account;
  unlocked.value = true;

  router.push("/")
}
</script>