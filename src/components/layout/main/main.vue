<template>
  <div class="main">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style scoped>
.main{
  min-height: 100%;
  padding: 0;
  position: relative;
}
</style>