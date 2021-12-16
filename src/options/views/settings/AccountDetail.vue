<template>
  账户详情页
  <hr />
  <var-row>
    <var-col :span="8">
      <input v-model="accountName" />
      <button @click="saveAccountName">保存</button>
      <br />
      {{ currentAccount.address }}
      <br />
    </var-col>
    <var-col :span="16">
      显示私钥
      <br />注意：永远不要公开这个私钥。任何拥有您的私钥的人都可以窃取您账户中的任何资产。
      <br />
      <div v-if="!privateKey">
        钱包密码：
        <input type="password" v-model="password" />
        <br />
        <button @click="exportPrivateKey">导出私钥</button>
      </div>
      <div v-else>
        {{ privateKey }} |
        <button @click="privateKey = ''; password = '';">我已复制</button>
      </div>
    </var-col>
  </var-row>
</template>

<script setup lang="ts">
import { importPrivateKey } from "~/scripts/lib/wallet";
import { aesDecrypt } from "~/scripts/lib/crypto";
import { accounts, currentAccount } from "~/logic/storage";

const accountName = ref(currentAccount.value.name)
const saveAccountName = () => {
  currentAccount.value.name = accountName.value
  Object.assign(accounts.value.find(item => item.address === currentAccount.value.address), currentAccount.value)
  console.info(accounts)
}

const password = ref("")
const privateKey = ref("")
const exportPrivateKey = () => {
  let descryptPrivateKey = aesDecrypt(
    currentAccount.value.privateKeyCiphertext,
    password.value
  );
  const wallet = importPrivateKey(descryptPrivateKey);
  if (wallet && wallet.address === currentAccount.value.address) {
    privateKey.value = descryptPrivateKey
  } else {
    privateKey.value = ''
    alert('密码错误')
  }
}
</script>