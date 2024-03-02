<template>
  <div class="common-layout" @click="clickCommonLayoutContainer">
    <transition name="backToTop" enter-active-class="animate__animated animate__bounceInDown" leave-active-class="animate__animated animate__backOutUp">
      <div v-if="isScrolling" class="back-top" key="boctTop">
        <div class="rope"></div>
        <div class="figure" @click="backToTop"></div>
      </div>
    </transition>
    <div class="top-menu-box" :class="{ 'top-flat': isScrolling }">
      <top-menu />
    </div>
    <div class="main" ref="mainBox" @scroll="containerScrolling">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from "vue"
  import TopMenu from "@/components/menu/TopMenu.vue"
  import { RouterView } from "vue-router"
  import emitter from "@/utils/eventBus"
  import { createHeartCanvas, stopMouseEffect, mouseClick } from "@/utils/mouseClickHeart"

  const isScrolling = ref(false)
  const mainBox = ref<HTMLElement>()
  const scrollTimer = ref()

  const containerScrolling = (event: any) => {
    // console.log("滚动", event, event.target.scrollTop, mainBox.value?.scrollTop)
    if (event.target.scrollTop) {
      isScrolling.value = true
    } else {
      isScrolling.value = false
    }
    // emitter.emit("start-scrolling", topHeight.value)
  }

  /**
   * 滚动条滚动操作
   * @param target 滚动目标位置，offsetTop or scrollHeight or scrollTop
   * @param speed 滚动速度，requestAnimationFrame函数一般默认是每秒60帧
   */
  const scrollToLocation = (target: number, speed: number) => {
    if (scrollTimer.value) {
      cancelAnimationFrame(scrollTimer.value)
    }
    // console.log("滚动条:", document.body.scrollTop, document.documentElement.scrollTop)
    scrollTimer.value = requestAnimationFrame(function fn() {
      // console.log("执行", mainBox.value)
      if (mainBox.value) {
        let oTop = mainBox.value.scrollTop
        // console.log("执行", oTop)
        if (oTop === target) {
          return
        }
        // 向下滚动
        if (target > oTop) {
          if (target - oTop > speed) {
            // document.body.scrollTop = document.documentElement.scrollTop = oTop - 50
            mainBox.value.scrollTop = oTop + speed
            scrollTimer.value = requestAnimationFrame(fn)
          } else {
            mainBox.value.scrollTop = target
            cancelAnimationFrame(scrollTimer.value)
          }
        } else {
          // 向上滚动
          if (oTop - target > speed) {
            mainBox.value.scrollTop = oTop - speed
            scrollTimer.value = requestAnimationFrame(fn)
          } else {
            mainBox.value.scrollTop = target
            cancelAnimationFrame(scrollTimer.value)
          }
        }
      }
    })
  }

  const backToTop = () => {
    console.log(mainBox.value?.scrollTop)
    scrollToLocation(0, 50)
  }

  const clickCommonLayoutContainer = (event: PointerEvent) => {
    mouseClick(event.clientX, event.clientY)
  }

  onMounted(() => {
    emitter.on("scroll-to-notes", (value: any) => {
      // console.log("点击：", value)
      scrollToLocation(value, 50)
    })

    createHeartCanvas()
  })

  onBeforeUnmount(() => {
    emitter.off("scroll-to-notes")

    stopMouseEffect()
  })
</script>

<style scoped lang="less">
  // 总体布局
  .common-layout {
    // 考虑到带鱼屏，这个vh，vw也并不是很好的选择
    // 搭嘎，自己写着完考虑个锤子的兼容性
    // ps：似乎正规流程是按照UI给的原型图，写px，然后插件转换为rem
    width: 100vw;
    height: 100vh;
    position: relative;

    .back-top {
      width: 100px;
      height: 90%;
      position: absolute;
      top: -50px;
      right: 50px;
      z-index: 9;
      // background-color: black;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;

      .rope {
        flex: 1;
        width: 20px;
        background-image: url("../assets/img/绳子.png");
        background-size: cover;
      }

      .figure {
        width: 80px;
        height: 80px;
        background-image: url("../assets/img/克拉拉.jpg");
        background-size: cover;
        cursor: pointer;
      }
    }

    .top-menu-box {
      width: 100%;
      min-width: 800px;
      height: 60px;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 9;

      background-color: transparent;
      font-size: 0.875rem;
      box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
      -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);

      will-change: background, height;
      -webkit-transition: background 0.5s ease-in-out, height 0.5s ease-in-out;
      transition: background 0.5s ease-in-out, height 0.5s ease-in-out;
    }

    .top-flat {
      height: 50px;

      background: rgba(47, 65, 84, 0.5);
      -webkit-backdrop-filter: blur(4px);
      backdrop-filter: blur(4px);

      will-change: background, height;
      -webkit-transition: background 0.5s ease-in-out, height 0.5s ease-in-out;
      transition: background 0.5s ease-in-out, height 0.5s ease-in-out;
    }

    .main {
      position: relative;
      width: 100%;
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;

      &::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
      }
      &::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        background-color: skyblue;
        background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.2) 75%, transparent 75%, transparent);
      }
      &::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #ededed;
        border-radius: 10px;
      }
    }
  }

  .animate__animated.animate__bounceInDown,
  .animate__animated.animate__backOutUp {
    --animate-duration: 2s;
  }
</style>
