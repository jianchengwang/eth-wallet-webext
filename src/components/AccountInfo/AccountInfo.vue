<template>
  <div>
    <span>账号名:{{ currentAccount.name }}</span>
    <br />
    <span>地址:{{ currentAccount.address }}</span> |
    <span @click="copyAddress">copy</span>
    <br />
  </div>
  <hr />
  <div>
    <span>eth logo 图片</span>
    <br />
    <span>eth 余额: {{ currentAccount.balance }}</span>
    <br />
    <span>
      <button>发送</button>
    </span>
  </div>
  <hr />
  <div>
    资产列表 |
    <router-link to="/settings/add-token">添加代币</router-link>
    <hr />
  </div>
</template>

<script setup lang="ts">
import { tryOnMounted, useClipboard } from '@vueuse/core'
import { currentAccount } from "~/logic/storage";
import { getBalance } from "~/scripts/lib/account";

tryOnMounted(() => {
  setInterval(() => {
    getBalance(currentAccount.value.address).then(balance => {
      currentAccount.value.balance = balance
    })
  }, 60000)
})

const copyAddress = () => {
  const source = ref(currentAccount.value.address)
  const { text, copy, copied, isSupported } = useClipboard({ source })
  if (copied.value) {
    alert('已复制到黏贴版')
  } else {
    alert('复制失败')
  }
}

</script>