<template>
  <div class="common-layout" ref="commonLayoutRef">
    <transition name="backToTop" enter-active-class="animate__animated animate__bounceInDown"
                leave-active-class="animate__animated animate__backOutUp">
      <div v-if="!expandHeader" class="back-top" key="boctTop">
        <div class="rope"></div>
        <div class="figure" @click="backToTop"></div>
      </div>
    </transition>

    <div class="header-layout" :class="{ 'expand-header-layout': expandHeader}">
      <Header :expand="expandHeader"/>
    </div>

    <div class="main-layout" ref="mainBox" @scroll="containerScrolling">
      <Main/>
    </div>

    <div class="layout-background-img">
      <div class="bg-down background-img-item" id="bgDown"></div>
      <div class="bg-up background-img-item" id="bgUp"></div>
      <!--      <template v-for="(item, index) in backgroundImgList" :key="index">-->
      <!--        <transition name="backgroundImg" mode="out-in" enter-active-class="animate__animated animate__fadeIn"-->
      <!--                    leave-active-class="animate__animated animate__fadeOut">-->
      <!--          <div v-show="index === showBackgroundImgIndex" class="background-img-item"-->
      <!--               :style="'background-image: url(' + item + ');'"></div>-->
      <!--        </transition>-->
      <!--      </template>-->
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onBeforeUnmount, reactive} from "vue"
import Main from "./main/main.vue"
import Header from "./header/header.vue"
import {startSakura, stopp} from "@/utils/sakuraPlus"
import emitter from '@/utils/eventBus'

const commonLayoutRef = ref<HTMLElement>()
const expandHeader = ref(true)
const mainBox = ref<HTMLElement>()
const scrollTimer = ref()
// live2D相关
const live2dDom = ref<HTMLElement | null>()
const live2dLocation = reactive({
  bottom: 0,
  left: 0,
  maxY: 0,
  maxX: 0,
  startX: 0,
  startY: 0,
  endX: 0,
  endY: 0,
  width: 0,
  height: 0,
})

const domUp = ref<HTMLElement>()
const domDown = ref<HTMLElement>()
const backgroundImgList = ref<Array<string>>([
  "/src/assets/image/bg6.jpg",
  "/src/assets/image/bg2.jpg",
  "/src/assets/image/bg3.jpg",
  "/src/assets/image/bg4.jpg",
  "/src/assets/image/bg5.jpg",
])
const showBackgroundImgIndex = ref<number>(0)
const bgChangeTimer = ref<number>()

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
    if (showBackgroundImgIndex.value < (backgroundImgList.value.length - 1)) {
      showBackgroundImgIndex.value += 1
    } else {
      showBackgroundImgIndex.value = 0
    }
  }, 100 * 1000)
}

const changeBgImg = () => {
  domDown.value!.style.backgroundImage = "url('" + backgroundImgList.value[showBackgroundImgIndex.value] + "')"
  showBackgroundImgIndex.value += 1
  if(showBackgroundImgIndex.value >= backgroundImgList.value.length) {
    showBackgroundImgIndex.value = 0
  }
  domUp.value!.classList.remove("bg-animation")
  requestAnimationFrame(()=>{
    domUp.value!.style.backgroundImage = "url('" + backgroundImgList.value[showBackgroundImgIndex.value] + "')"
    domUp.value!.classList.add("bg-animation")
  })
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

const initLive2d = () => {
  live2dDom.value!.style.display = "flex"
  live2dLocation.width = live2dDom.value!.offsetWidth
  live2dLocation.height = live2dDom.value!.offsetHeight
  live2dDom.value!.style.opacity = "1"
  live2dLocation.bottom = 0
  live2dLocation.left = 0
  live2dLocation.maxY = commonLayoutRef.value ? commonLayoutRef.value.clientHeight : window.screenY
  live2dLocation.maxX = commonLayoutRef.value ? commonLayoutRef.value.clientWidth : window.screenX
}

const dragStarted = (e: DragEvent) => {
  live2dLocation.startX = e.clientX
  live2dLocation.startY = e.clientY
  live2dDom.value!.style.opacity = '0.5'
}

const dragEnded = (e: DragEvent) => {
  live2dLocation.endX = e.clientX
  live2dLocation.endY = e.clientY
  live2dLocation.left += live2dLocation.endX - live2dLocation.startX
  if (live2dLocation.left < 0) {
    live2dLocation.left = 0
  } else if (live2dLocation.left > live2dLocation.maxX - live2dLocation.width) {
    live2dLocation.left = live2dLocation.maxX - live2dLocation.width
  }
  live2dLocation.bottom += live2dLocation.startY - live2dLocation.endY
  if (live2dLocation.bottom < 0) {
    live2dLocation.bottom = 0
  } else if (live2dLocation.bottom > live2dLocation.maxY - live2dLocation.height) {
    live2dLocation.bottom = live2dLocation.maxY - live2dLocation.height
  }
  live2dDom.value!.style.opacity = "1"
  live2dDom.value!.style.left = live2dLocation.left + "px"
  live2dDom.value!.style.bottom = live2dLocation.bottom + "px"
  console.log("结束拖拽：", live2dLocation, e.clientX)
}

onMounted(() => {
  startSakura()
  imageCarousel()

  live2dDom.value = document.getElementById("live2dContainer")
  if (live2dDom.value) {
    // let timer = setTimeout(() => {
    initLive2d()
    // clearTimeout(timer)
    // }, 2000)
    live2dDom.value.addEventListener("dragstart", dragStarted)
    live2dDom.value.addEventListener("dragend", dragEnded)
  }

  domUp.value = document.getElementById("bgUp")!
  domUp.value!.style.backgroundImage = "url('" + backgroundImgList.value[showBackgroundImgIndex.value] + "')"
  domUp.value!.classList.add("bg-animation")
  console.log("ddd", domUp.value!.classList)

  domDown.value = document.getElementById("bgDown")!

  bgChangeTimer.value = setInterval(()=>{
    changeBgImg()
  }, 5 * 60 * 1000)

  emitter.on('clickNoteToc', (value) => {
    console.log(("接收："), value)
    scrollToLocation(Number(value), 50)
  })
})

onBeforeUnmount(() => {
  stopp()
  live2dDom.value?.removeEventListener("dragstart", dragStarted)
  live2dDom.value?.removeEventListener("dragend", dragEnded)
  if(bgChangeTimer.value) {
    clearInterval(bgChangeTimer.value)
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
  //min-width: 1500px;
  min-height: 500px;

  display: flex;
  flex-direction: column;

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
      background-image: url("../../assets/img/绳子.png");
      background-size: cover;
    }

    .figure {
      width: 80px;
      height: 80px;
      background-image: url("../../assets/img/克拉拉.jpg");
      background-size: cover;
      cursor: pointer;
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

  .layout-background-img {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;

    .background-img-item {
      position: absolute;
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-position: center top;
      background-size: cover;
    }
  }
}

//.animate__animated.animate__bounceInDown,
//.animate__animated.animate__backOutUp,
//.animate__animated.animate__fadeIn,
//.animate__animated.animate__fadeOut {
//  --animate-duration: 2s;
//}

.bg-animation {
  //mask: radial-gradient(#000 cale(var(--x) * 1%), transparent cale(var(--x) * 1%));
  //mask-size: 40px 40px;
  mask-repeat:no-repeat;
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
</style>