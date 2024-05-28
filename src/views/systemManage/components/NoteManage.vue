<template>
  <div class="note-manage-container">
    <div class="operation-container">
      <el-button class="note-btn" type="primary" text :icon="Plus">新增</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { Plus } from "@element-plus/icons-vue"

</script>

<style scoped lang="less">

</style>