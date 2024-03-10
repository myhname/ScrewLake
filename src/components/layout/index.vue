<template>
  <div class="common-layout">
    <div class="header-layout" :class="{ 'expand-header-layout': expandHeader}">
      <Header :expand="expandHeader"/>
    </div>

    <div class="main-layout" @scroll="containerScrolling">
      <Main/>
    </div>


    <div class="layout-background-img">
      <template v-for="(item, index) in backgroundImgList" :key="index">
        <transition name="backgroundImg" mode="out-in" enter-active-class="animate__animated animate__fadeIn"
                    leave-active-class="animate__animated animate__fadeOut">
          <div v-show="index === showBackgroudImgIndex" class="background-img-item"
               :style="'background-image: url(' + item + ');'"></div>
        </transition>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onBeforeUnmount, reactive} from "vue"
import Main from "./main/main.vue"
import Header from "./header/header.vue"
import {startSakura, stopp} from "@/utils/sakuraPlus"

const expandHeader = ref(true)

const backgroundImgList = ref<Array<string>>([
  "/src/assets/image/bg1.jpg",
  "/src/assets/image/bg2.jpg",
  "/src/assets/image/bg3.jpg",
  "/src/assets/image/bg4.jpg",
  "/src/assets/image/bg5.jpg",
])
const showBackgroudImgIndex = ref<number>(0)

/**
 * 头部标题栏滚动事件监听
 * @param event
 */
const containerScrolling = (event: any) => {
  // console.log("滚动", event, event.target.scrollTop, mainBox.value?.scrollTop)
  expandHeader.value = !event.target.scrollTop
  // emitter.emit("start-scrolling", topHeight.value)
}

/**
 * 背景图片轮播
 */
const imageCarousel = () => {
  let timer = setInterval(() => {
    if (showBackgroudImgIndex.value < (backgroundImgList.value.length - 1)) {
      showBackgroudImgIndex.value += 1
    } else {
      showBackgroudImgIndex.value = 0
    }
  }, 100 * 1000)
}

onMounted(() => {
  startSakura()
  imageCarousel()
})

onBeforeUnmount(() => {
  stopp()
})
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

  .layout-background-img {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;

    .background-img-item {
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-position: center top;
      background-size: cover;
    }
  }
}

.animate__animated.animate__fadeIn,
.animate__animated.animate__fadeOut {
  --animate-duration: 2s;
}
</style>