<template>
  <div>
    <var-row>
      <var-col :span="4">
        <ul>
          <li>网络设置</li>
          <li>关于</li>
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