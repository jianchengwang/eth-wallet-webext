<template>
  <main>
    <var-tabs v-model:active="active">
      <var-tab>创建账户</var-tab>
      <var-tab>导入账户</var-tab>
      <var-tab>解锁页面</var-tab>
      <var-tab>切换网络</var-tab>
    </var-tabs>

    <!-- <NewAccount v-if="active == 0" /> -->
    <div style="margin: 40px;">
      <NewAccount v-if="active == 0" />
      <ImportAccount v-if="active == 1" />
      <Unlock v-if="active == 2" />
      <NetworkProviderChange v-if="active == 3" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue"

let active = ref(0)
function test() {
  const globalState = useGlobalState();
  console.info(globalState.provider);
  console.info(currentAccount.value.address);
  globalState.provider
    .getBalance(currentAccount.value.address)
    .then((balanceStr) => {
      console.info(balanceStr);
    });
}
</script>

<style scoped>
var-tab-item {
  height: 100%;
}
</style>
