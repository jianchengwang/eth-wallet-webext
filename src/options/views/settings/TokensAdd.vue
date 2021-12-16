<template>
  添加代币页面
  <hr />
  <div>
    代币类型
    <input v-model="formData.type" />
    <br />合约地址
    <input v-model="formData.address" />
    <br />代币符号
    <input v-model="formData.symbol" />
    <br />小数点精度
    <input v-model="formData.precision" />
    <br />
    <router-link to="/">取消</router-link>|
    <button @click="addToken">保存</button>
  </div>
</template>

<script setup lang="ts">
import { TokenType } from '~/scripts/constants/index'
import { Token } from "~/scripts/types/Token"
import { accounts, currentAccount, networks, currentNetwork } from "~/logic/storage";

let tokenTmp: Token = {
  networkId: currentNetwork.value.id,
  type: TokenType.ERC20,
  address: '',
  symbol: '',
  precision: 18,
  balance: 0
}
const formData = reactive(tokenTmp)
const addToken = () => {
  const tokenMap = reactive(currentAccount.value.tokenMap)
  tokenMap[currentNetwork.value.id].push()

}
</script>