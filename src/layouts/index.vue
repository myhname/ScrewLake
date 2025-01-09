<template>
  <div class="common-layout" ref="commonLayoutRef">
<!--    <left-control :is-show="expandLeft"></left-control>-->

    <div class="main-layout">
      <RouterView/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onBeforeUnmount, reactive} from "vue"
// import LeftControl from "@/components/layout/components/LeftControl.vue";
// import {startSakura, stopp} from "@/utils/sakuraPlus"
import {RouterView} from "vue-router";

const commonLayoutRef = ref<HTMLElement>()
const expandLeft = ref(true)

// onMounted(() => {
//   startSakura()
//
//   console.log("window.location.origin", window.location.origin)
// })
//
// onBeforeUnmount(() => {
//   stopp()
// })
</script>

<style scoped lang="less">
.common-layout {
  width: 100%;
  position: relative;

  display: flex;
  flex-direction: column;

  .main-layout {
    width: 100%;
    min-height: 100vh;

    overflow-x: hidden;
  }
}
</style>