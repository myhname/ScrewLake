<template>
  <div class="box">
    <ElConfigProvider :locale="locale">
      <transition name="backToTop" enter-active-class="animate__animated animate__bounceInDown"
                  leave-active-class="animate__animated animate__backOutUp">
        <div v-if="!expandHeader" class="back-top" key="bockTop">
          <div class="rope cursor-pointer" @click="backToTop"></div>
        </div>
      </transition>

      <!--  顶部控制区域 -->
      <!--      <div class="header-layout">-->
      <!--        <Header :expand="true"/>-->
      <!--      </div>-->

      <div ref="mainBox" class="main-layout scroll-style" @scroll="containerScrolling">
        <router-view v-slot="{ Component, route }">
          <!-- done: 这种写法理论上支持指定标签页不同切换特效，稍后可以实践一下，这里的报错就无语，抄的官网的示例，不兼容ts能咋办 -->
          <!-- 添加：mode="out-in" 属性可以使得过渡动画按顺序发生，默认是进入和离开的元素都是在同时开始动画的 -->
          <!--  上下切换的过渡效果很怪，要么就是不同步，要么就看不到进入的页面 enter-active-class="animate__animated animate__fadeInUp" leave-active-class="animate__animated animate__fadeOutUp"-->
          <transition :name="route.meta.transition || 'fade'" mode="out-in">
            <component :is="Component"/>
          </transition>
        </router-view>
      </div>

    </ElConfigProvider>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue"
import {RouterView} from "vue-router"
import {ElConfigProvider} from "element-plus"
import zhCn from "element-plus/es/locale/lang/zh-cn"
import dayjs from "dayjs"
import "dayjs/locale/zh-cn"
// import Header from "@/components/layout/header/header.vue"
import {useConfigStore} from "@/stores/modules/config"
import {watchWindowSize} from "@/hooks/screen"
import {useTheme} from "@/hooks/theme"

dayjs.locale("zh-cn")
const locale = zhCn
const mainBox = ref<HTMLElement>()
const expandHeader = ref(true)
const scrollTimer = ref()

/**
 * 头部标题栏滚动事件监听
 * @param event
 */
const containerScrolling = (event: any) => {
  expandHeader.value = !event.target.scrollTop
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
  scrollTimer.value = requestAnimationFrame(function fn() {
    if (mainBox.value) {
      let oTop = mainBox.value.scrollTop
      if (oTop === target) {
        return
      }
      // 向下滚动
      if (target > oTop) {
        if (target - oTop > speed) {
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

// watchWindowSize 内部已经有了 onMounted 生命周期，所以不能再放到 onMounted 中嵌套回调
watchWindowSize()
useTheme()
</script>

<style scoped lang="less">
.box {
  width: 100vw;
  height: 100vh;
  min-height: 500px;
  min-width: 500px;
  position: relative;
  overflow: hidden;

  display: flex;
  flex-direction: column;

  .back-top {
    width: 100px;
    height: 90%;
    position: absolute;
    top: -50px;
    right: 50px;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    .rope {
      flex: 1;
      width: 60px;
      background-image: url("assets/img/cat-back-top.png");
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
    z-index: 3;
  }

  .main-layout {
    flex: 1;
    position: relative;
    overflow-x: hidden;
    overflow-y: auto;
  }
}

// 路由切换特效
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transition: opacity 1s ease;
}

// animate 动画效果控制
.animate__animated.animate__bounceInDown,
.animate__animated.animate__backOutUp {
  --animate-duration: 2s;
}
</style>
