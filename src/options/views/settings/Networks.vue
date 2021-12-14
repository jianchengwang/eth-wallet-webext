<template>
  <div>
    <var-row>
      <var-col :span="4">
        <ul>
          <li
            v-for="item in networks"
            :key="item.id"
            @click="changeNetwork(item.id)"
          >{{ item.name }}</li>
        </ul>
      </var-col>
      <var-col :span="20">
        <div>
          网络名称
          <input v-model="formData.name" />
          <br />ChainID
          <input v-model="formData.chainId" />
          <br />Symbol
          <input v-model="formData.symbol" />
          <br />Rpc
          <input v-model="formData.rpc" />
          <br />Explorer
          <input v-model="formData.explorer" />
          <br />
          <button @click="updateNetwork">保存</button>
        </div>
      </var-col>
    </var-row>
  </div>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

import { Network } from "~/scripts/types/Network"
import { accounts, currentAccount, networks, currentNetwork } from "~/logic/storage";
import { useGlobalState } from "~/logic/state";

const globalState = useGlobalState();

const networkId = ref(0)
const formData = reactive({
  name: '',
  chainId: 0,
  symbol: '',
  rpc: '',
  explorer: ''
})
Object.assign(formData, currentNetwork.value);

const changeNetwork = (value) => {
  networkId.value = value;
  Object.assign(formData, networks.value.find(item => item.id === value));
}

const updateNetwork = () => {
  Object.assign(networks.value.find(item => item.id === networkId.value), formData);
  globalState.changeNetworkProvider();
}

</script>

<style scoped>
</style>