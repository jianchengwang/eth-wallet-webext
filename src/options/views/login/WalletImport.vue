<template>
  <div>导入钱包</div>
  <div>
    私钥
    <input name="privateKey" v-model="formData.privateKey" />
  </div>
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
    <button @click="create">确定</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

import { Account } from "~/scripts/types/Account";
import { Token } from "~/scripts/types/Token";
import { importPrivateKey } from "~/scripts/lib/wallet";
import { aesEncrypt } from "~/scripts/lib/crypto";
import { accounts, currentAccount, unlocked } from "~/logic/storage";

const router = useRouter()

const formData = reactive({
  privateKey: '',
  password: '',
  confirmPassword: '',
  agreeTermsOfUse: false
})
const showTermsOfUse = ref(false)

const create = () => {
  if (!formData.privateKey) {
    alert('私钥不能为空')
    return
  }
  if (formData.password != formData.confirmPassword) {
    alert('密码不一致')
    return
  }
  if (!formData.agreeTermsOfUse) {
    alert('请勾选使用条款')
    return
  }
  const wallet = importPrivateKey(formData.privateKey);
  const privateKeyCiphertext = aesEncrypt(
    wallet.privateKey,
    formData.password
  );
  let account: Account = {
    name: "Account" + (accounts.value.length + 1),
    address: wallet.address,
    publicKey: wallet.publicKey,
    privateKey: wallet.privateKey,
    privateKeyCiphertext: privateKeyCiphertext,
    balance: 0,
    nonce: 0,
    tokenMap: new Map<Number, Token[]>()
  }
  accounts.value.push(account);
  currentAccount.value = account;
  unlocked.value = true;

  router.push("/")
}
</script>