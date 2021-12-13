<template>
  <div class="container">
    <var-row>
      <var-col :span="24">
        <var-form ref="form" style="margin: 50px;">
          <var-select placeholder="请选择账号" v-model="accountAddress" @change="accountChange">
            <var-option
              v-for="item in accounts"
              :label="item.address"
              :value="item.address"
              @change="accountChange"
            />
          </var-select>
          <var-select placeholder="请选择网络" v-model="networkId" @change="networkProviderChange">
            <var-option v-for="item in networks" :label="item.name" :value="item.id" />
          </var-select>

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
            @click="getBalance"
          >查询余额</var-button>
        </var-form>
      </var-col>
    </var-row>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue"
import { accounts, currentAccount, networks, currentNetwork } from "~/logic/storage";
import { useGlobalState } from "~/logic/state";

import { ethers } from "ethers";

const globalState = useGlobalState();

const accountAddress = ref(currentAccount.value.address)
const networkId = ref(1)

const accountChange = (value) => {
  accountAddress.value = value;
  currentAccount.value = accounts.value.find(item => item.address === value);
}

const networkProviderChange = (value) => {
  networkId.value = value
  Object.assign(currentNetwork.value, networks.value.find(item => item.id === value));
  globalState.changeNetworkProvider();
};

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
