<template>
  添加网络页面
  <hr />
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
    <button @click="goBack">取消</button>|
    <button>保存</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter()
const goBack = () => {
  router.go(-1)
}

const formData = reactive({
  name: '',
  chainId: 0,
  symbol: '',
  rpc: '',
  explorer: ''
})
</script>