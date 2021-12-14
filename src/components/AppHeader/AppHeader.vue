<template>
  <div>
    <span>logo图片</span>|
    <span>
      <select v-model="networkId" @change="networkChange">
        <option v-for="item in networks" :key="item.id" :value="item.id">{{ item.name }}</option>
      </select>
      <button @click="toSettingNetwork">添加网络</button>
    </span>|
    <span>
      账号头像
      <select v-model="accountAddress" @change="accountChange">
        <option v-for="item in accounts" :key="item.address" :value="item.address">{{ item.name }}</option>
      </select>
    </span>
  </div>
</template>

<script setup lang="ts">

import { useRouter } from "vue-router";

import { accounts, currentAccount, networks, currentNetwork } from "~/logic/storage";
import { useGlobalState } from "~/logic/state";

import { ethers } from "ethers";

const networkId = ref(currentNetwork.value.id)
const networkChange = (value) => {
  Object.assign(currentNetwork.value, networks.value.find(item => item.id === networkId.value));
  globalState.changeNetworkProvider();
};
const router = useRouter()
const toSettingNetwork = () => {
  router.push("/settings/networks/add-network")
}


const globalState = useGlobalState();
const accountAddress = ref(currentAccount.value.address)
const accountChange = () => {
  currentAccount.value = accounts.value.find(item => item.address === accountAddress.value);
}
const getBalance = () => {
  globalState.provider
    .getBalance(currentAccount.value.address)
    .then((balance) => {
      // 余额是 BigNumber (in wei); 格式化为 ether 字符串
      let etherString = ethers.utils.formatEther(balance);
      console.log("Balance: " + etherString);
    });
};

</script>