<template>
  <var-app-bar
    title
    title-position="center"
    color="#f2f3f4"
    text-color="#6a737d"
    style="height: 75px; width: auto;"
  >
    <template #left>
      <var-icon name="/assets/images/logo/metamask-fox.svg" :size="35" style="margin-left: 5px" />
    </template>
    <template #default>
      <var-chip plain style="font-size: 0.75rem" @click="selectNetwork = !selectNetwork">
        {{ currentNetwork.name }}
        <template #left>
          <var-icon name="refresh" />
        </template>
        <template #right>
          <var-icon name="chevron-down" />
        </template>
      </var-chip>
      <var-action-sheet
        title="网络"
        :actions="networks"
        v-model:show="selectNetwork"
        @select="setCurrentNwork"
      />
    </template>
    <template #right>
      <var-icon name="account-circle" :size="35" style="margin-right: 5px" />
    </template>
  </var-app-bar>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { toReactive } from "@vueuse/core";
import { Snackbar } from "@varlet/ui";
import { Network } from "~/scripts/types/Network";
import { currentNetwork, networks } from "~/logic/storage";

let selectNetwork = ref(false);
const setCurrentNwork = (item: Network) => {
  Object.assign(currentNetwork.value, item);
};
</script>

<style scoped>
</style>