<template>
  <div class="common-layout">
    <transition name="backToTop" enter-active-class="animate__animated animate__bounceInDown"
                leave-active-class="animate__animated animate__backOutUp">
      <div v-if="!state.expandHeader" class="back-top" key="backTop">
        <div class="rope cursor-pointer" @click="backToTop"></div>
      </div>
    </transition>

    <div class="header-layout" :class="{ 'expand-header-layout': state.expandHeader}">
      <blog-header :expand="state.expandHeader"/>
    </div>

    <div class="main-layout scroll-style" ref="mainBox" @scroll="containerScrolling">
      <RouterView/>
    </div>

    <div class="layout-background-img">
      <div class="bg-down background-img-item bg-cover" id="bgDown"></div>
      <div class="bg-up background-img-item bg-cover" id="bgUp"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onBeforeUnmount, reactive} from "vue"
import {RouterView} from 'vue-router'
import BlogHeader from "./components/BlogHeader.vue"
import {startSakura, stopp} from "@/utils/sakuraPlus"
import emitter from '@/utils/eventBus'

const mainBox = ref<HTMLElement>()
const domUp = ref<HTMLElement>()
const domDown = ref<HTMLElement>()

const state = reactive({
  scrollTimer: null as number | null,
  bgChangeTimer: null as number | null,

  expandHeader: true,

  showBackgroundImgIndex: 0,
  backgroundImgList: [
    new URL("/src/assets/img/bg1.jpg", import.meta.url).href,
    new URL("/src/assets/img/bg2.jpg", import.meta.url).href,
    new URL("/src/assets/img/bg3.jpg", import.meta.url).href,
    new URL("/src/assets/img/bg4.jpg", import.meta.url).href,
    new URL("/src/assets/img/bg5.jpg", import.meta.url).href,
    new URL("/src/assets/img/bg6.jpg", import.meta.url).href,
  ]
})

/**
 * 头部标题栏滚动事件监听
 * @param event
 */
const containerScrolling = (event: any) => {
  // console.log("滚动", event, event.target.scrollTop, mainBox.value?.scrollTop)
  state.expandHeader = !event.target.scrollTop
  // emitter.emit("start-scrolling", topHeight.value)
}

/**
 * 切换背景图片
 */
const changeBgImg = () => {
  domDown.value!.style.backgroundImage = "url('" + state.backgroundImgList[state.showBackgroundImgIndex] + "')"
  state.showBackgroundImgIndex += 1
  if (state.showBackgroundImgIndex >= state.backgroundImgList.length) {
    state.showBackgroundImgIndex = 0
  }
  domUp.value!.classList.remove("bg-animation")
  requestAnimationFrame(() => {
    domUp.value!.style.backgroundImage = "url('" + state.backgroundImgList[state.showBackgroundImgIndex] + "')"
    domUp.value!.classList.add("bg-animation")
  })
}

/**
 * 滚动条滚动操作
 * @param target 滚动目标位置，offsetTop or scrollHeight or scrollTop
 * @param speed 滚动速度，requestAnimationFrame函数一般默认是每秒60帧
 */
const scrollToLocation = (target: number, speed: number) => {
  if (state.scrollTimer) {
    cancelAnimationFrame(state.scrollTimer)
  }
  // console.log("滚动条:", document.body.scrollTop, document.documentElement.scrollTop)
  state.scrollTimer = requestAnimationFrame(function fn() {
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
          state.scrollTimer = requestAnimationFrame(fn)
        } else {
          mainBox.value.scrollTop = target
          cancelAnimationFrame(state.scrollTimer!)
        }
      } else {
        // 向上滚动
        if (oTop - target > speed) {
          mainBox.value.scrollTop = oTop - speed
          state.scrollTimer = requestAnimationFrame(fn)
        } else {
          mainBox.value.scrollTop = target
          cancelAnimationFrame(state.scrollTimer!)
        }
      }
    }
  })
}

/**
 * 返回顶部
 */
const backToTop = () => {
  console.log(mainBox.value?.scrollTop)
  scrollToLocation(0, 50)
}

onMounted(() => {
  startSakura()

  console.log("window.location.origin", window.location.origin)

  domUp.value = document.getElementById("bgUp")!
  domUp.value!.style.backgroundImage = "url('" + state.backgroundImgList[state.showBackgroundImgIndex] + "')"
  domUp.value!.classList.add("bg-animation")
  console.log("ddd", domUp.value!.classList)

  domDown.value = document.getElementById("bgDown")!

  state.bgChangeTimer = setInterval(() => {
    console.log("切换背景图片")
    changeBgImg()
  }, 60 * 5  * 1000)

  // 点击目录时滚动事件
  emitter.on('clickNoteToc', (value) => {
    console.log(("接收："), value)
    scrollToLocation(Number(value), 50)
  })
})

onBeforeUnmount(() => {
  stopp()
  if (state.bgChangeTimer) {
    clearInterval(state.bgChangeTimer)
  }
  emitter.off('clickNoteToc')
})
</script>

<style scoped lang="less">
.common-layout {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  display: flex;
  flex-direction: column;

  .back-top {
    width: 100px;
    height: 70vh;
    position: absolute;
    top: 0;
    right: 10px;
    z-index: 9;

    .rope {
      height: 100%;
      width: 60px;
      margin: auto;
      background-image: url("../assets/img/cat-back-top.png");
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }
  }

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
    position: relative;
    overflow-x: auto;
    overflow-y: auto;
  }

  .layout-background-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;

    .background-img-item {
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }
}

.bg-animation {
  //mask: radial-gradient(#000 cale(var(--x) * 1%), transparent cale(var(--x) * 1%));
  //mask-size: 40px 40px;
  mask-repeat: no-repeat;
  animation: bgChange 1s linear;
}

.for-change(@i) when (@i <= 100) {
  @var: @i * 1%;
  @{var} {
    mask: radial-gradient(#000 @var, transparent @var);
    mask-size: 50px 50px;
    filter: brightness(@var);
  }
  .for-change(@i + 1);
}

@keyframes bgChange {
  .for-change(0);
}

//.animate__animated.animate__bounceInDown,
//.animate__animated.animate__backOutUp,
//.animate__animated.animate__fadeIn,
//.animate__animated.animate__fadeOut {
//  --animate-duration: 2s;
//}
</style>