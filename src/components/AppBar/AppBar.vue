<template>
  <var-app-bar
    title=""
    title-position="center"
    color="#f2f3f4"
    text-color="#6a737d"
    style="height: 75px"
  >
    <template #left>
      <var-image
        width="35px"
        height="35px"
        fit="cover"
        src="/assets/metamask-fox.svg"
        style="margin-left: 5px"
      />
    </template>
    <template #default>
      <var-chip
        plain
        style="font-size: 0.75rem"
        @click="selectNetwork = !selectNetwork"
      >
        {{ currentNetwork.name }}
        <template #left>
          <var-icon name="refresh" />
        </template>
        <template #right>
          <var-icon name="chevron-down" />
        </template>
      </var-chip>
    </template>
    <template #right>
      <var-icon name="account-circle" :size="35" style="margin-right: 5px" />
    </template>
  </var-app-bar>

  <var-action-sheet
    title="网络"
    :actions="DEFAULT_NETWORKS"
    v-model:show="selectNetwork"
    @select="setCurrentNwork"
  />
</template>

<script lang="ts">
import { ref } from "vue";
import { Snackbar } from "@varlet/ui";
import { Network } from "~/types/Network";
import { DEFAULT_NETWORKS } from "~/constants/index";

export default {
  setup() {
    const offsetY = ref(false);
    const menuList = ref([
      { label: "选项一", value: "menu1" },
      { label: "选项二", value: "menu2" },
    ]);

    const goBack = () => {
      Snackbar({
        content: "返回",
        position: "top",
      });
    };

    console.info(DEFAULT_NETWORKS);
    let currentNetwork = reactive(DEFAULT_NETWORKS[0]);
    let selectNetwork = ref(false);
    const setCurrentNwork = (item: Network) => {
      Object.assign(currentNetwork, item);
    };

    return {
      offsetY,
      menuList,
      goBack,
      DEFAULT_NETWORKS,
      currentNetwork,
      selectNetwork,
      setCurrentNwork,
    };
  },
};
</script>

<style scoped>
.var-snackbar {
  background: transparent;
}

.menu-list {
  background: #fff;
}

.menu-list .menu-cell {
  display: block;
  padding: 10px;
}
</style>