<template>
  <var-app-bar title="" title-position="center" color="white" text-color="#989a9b" style="height: 75px">
    <template #default>
      <var-chip plain style="font-size: 0.75rem;height: 50px;width: 40%;">
        <div style="font-size: 0.95rem;font-weight:bold;margin-bottom: 10px;">{{ currentAccount.name }}</div>
        <div style="font-size: 0.45rem;font-weight:300;">{{ currentAccount.address.slice(0, 5) + "..." + currentAccount.address.slice(-4) }}</div>
      </var-chip>

    </template>
    <template #right>
      <var-icon name="menu" :size="24" />
    </template>
  </var-app-bar>
</template>

<script lang="ts">
import { ref } from "vue";
import { toReactive } from "@vueuse/core";
import { Snackbar } from "@varlet/ui";
import { Network } from "~/scripts/types/Network";
import { currentAccount } from "~/logic/storage";

export default {
  setup() {
    return {
      currentAccount,
    };
  },
};
</script>

<style scoped>
</style>