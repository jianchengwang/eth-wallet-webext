<template>
  <div>
    <span>账号名:{{ currentAccount.name }}</span>
    <br />
    <span>地址:{{ currentAccount.address }}</span>
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
    <button>添加代币</button>
    <hr />
  </div>
</template>

<script setup lang="ts">
import { accounts, currentAccount, networks, currentNetwork } from "~/logic/storage";
</script>