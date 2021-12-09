<template>
  <main class="w-[400px] h-[600px] text-center">
    <AppBar />
    <NewAccount v-if="accounts.length == 0" />
    <Unlock v-else-if="!unlocked" />
    <div v-else>
      <AppBody />
      <div>Eth Wallet</div>
      <p class="mt-2 opacity-50">This is the popup page</p>
      <button class="btn mt-2" @click="openOptionsPage">Open Options</button>
      <div class="mt-2">
        <span class="opacity-50">Storage:</span> {{ storageDemo }}
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { storageDemo } from "~/logic/storage";
import { accounts, unlocked } from "~/logic/storage";

function openOptionsPage() {
  browser.runtime.openOptionsPage();
}
</script>
