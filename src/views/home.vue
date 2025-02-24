<template>
  <div class="home-container">
    <module-menu :is-tray="false"></module-menu>
  </div>
</template>

<script setup lang="ts">
import ModuleMenu from "@/components/ModuleMenu.vue"
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
</style>