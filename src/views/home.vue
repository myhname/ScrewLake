<template>
  <div class="home-container">首页 {{ userStore.userInfo.name }}</div>
</template>

<script setup lang="ts">
import {useUserStore} from "@/stores/modules/user.ts";

const userStore = useUserStore()
</script>

<style lang="less" scoped>
.home-container {
  height: 1000px;
}
</style>