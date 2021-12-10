<template>
  <var-app-bar
    title=""
    title-position="center"
    color="white"
    text-color="#989a9b"
    style="height: 75px"
  >
    <template #default>
      <var-chip plain style="font-size: 0.75rem; height: 50px; width: 40%">
        <div style="font-size: 0.95rem; font-weight: bold; margin-bottom: 10px">
          {{ currentAccount.name }}
        </div>
        <div style="font-size: 0.45rem; font-weight: 300">
          {{
            currentAccount.address.slice(0, 5) +
            "..." +
            currentAccount.address.slice(-4)
          }}
        </div>
      </var-chip>
      <div class="container">
        <var-row>
          <var-col :span="24">
            <var-icon name="/assets/eth.svg" :size="32" />
          </var-col>
        </var-row>
        <var-row>
          <var-col :span="24">
            <p class="title">{{ balance }} ETH</p>
          </var-col>
        </var-row>
      </div>
    </template>
    <template #right>
      <var-icon name="menu" :size="24" />
    </template>
  </var-app-bar>
</template>

<script lang="ts">
import ethers from "ethers";
import { ref } from "vue";
import { toReactive } from "@vueuse/core";
import { Snackbar } from "@varlet/ui";
import { Network } from "~/scripts/types/Network";
import { currentAccount } from "~/logic/storage";
// import { globalState } from "~/logic/state";

export default {
  setup() {
    let balance = ref("");
    // globalState.provider
    //   .getBalance(currentAccount.address)
    //   .then((balanceStr) => {
    //     // 余额是 BigNumber (in wei); 格式化为 ether 字符串
    //     let etherString = ethers.utils.formatEther(balanceStr);
    //     alert(etherString);
    //     balance.value = etherString;
    //   });
    return {
      currentAccount,
      balance,
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
  background-color: #fff;
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