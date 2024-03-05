<template>
  <div class="common-layout">
    <div class="header-layout" :class="{ 'expand-header-layout': expandHeader}">
      <Header :expand="expandHeader"/>
    </div>

    <div class="main-layout" @scroll="containerScrolling">
        <Main/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue"
import Main from "./main/main.vue"
import Header from "./header/header.vue"

const expandHeader = ref(true)

const containerScrolling = (event: any) => {
  // console.log("滚动", event, event.target.scrollTop, mainBox.value?.scrollTop)
  expandHeader.value = !event.target.scrollTop
  // emitter.emit("start-scrolling", topHeight.value)
}

</script>

<style scoped lang="less">

.common-layout {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  min-width: 800px;
  min-height: 500px;

  display: flex;
  flex-direction: column;

  .header-layout {
    height: 50px;
    position: relative;
    -webkit-transition: height 0.5s ease-in-out;
    transition: height 0.5s ease-in-out;
  }

  .expand-header-layout {
    height: 85px;
    -webkit-transition: height 0.5s ease-in-out;
    transition: height 0.5s ease-in-out;
  }

  .main-layout {
    flex: 1;
    overflow: auto;
  }
}
</style>