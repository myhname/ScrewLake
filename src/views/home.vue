<template>
  <div>首页 {{ userStore.userInfo.name }}</div>
</template>

<script setup lang="ts">
import {useUserStore} from "@/stores/modules/user.ts";

const userStore = useUserStore()
</script>

<style lang="less" scoped></style>