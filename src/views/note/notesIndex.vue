<template>
  <div class="notes-container">
    笔记目录页
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted, onBeforeUnmount } from "vue"
  import emitter from "@/utils/eventBus"

  const isScorlling = ref(false)

  onMounted(() => {
    emitter.on("start-scrolling", (value: any)=>{
      isScorlling.value = value
    })
  })

  onBeforeUnmount(()=>{
    emitter.off("start-scrolling")
  })
</script>

<style scoped lang="less">
  .notes-container {
    width: 100%;
    height: 100%;
    min-height: 500px;
    position: relative;

    background-image: url("../../assets//image/玫瑰凛.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: top center;
    background-attachment: scroll
  }
</style>
