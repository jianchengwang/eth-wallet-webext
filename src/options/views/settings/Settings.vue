<template>
  <div>
    <var-row>
      <var-col :span="4">
        <ul>
          <li>
            <router-link to="/settings/accountDetail">账户详情</router-link>
          </li>
          <li>
            <router-link to="/settings/networks">网络设置</router-link>
          </li>
          <li>
            <router-link to="/settings/add-token">添加代币</router-link>
          </li>
          <li>
            <router-link to="/settings/about">关于</router-link>
          </li>
        </ul>
      </var-col>
      <var-col :span="20">
        <router-view></router-view>
      </var-col>
    </var-row>
  </div>
</template>

<script setup lang="ts">

</script>