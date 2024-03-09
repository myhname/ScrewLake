<template>
  <div class="box">
    <ElConfigProvider :locale="locale">
      <a-config-provider :locale="antLocale">
        <router-view v-slot="{ Component, route }">
          <!-- done: 这种写法理论上支持指定标签页不同切换特效，稍后可以实践一下，这里的报错就无语，抄的官网的示例，不兼容ts能咋办 -->
          <!-- 添加：mode="out-in" 属性可以使得过渡动画按顺序发生，默认是进入和离开的元素都是在同时开始动画的 -->
<!--  上下切换的过渡效果很怪，要么就是不同步，要么就看不到进入的页面 enter-active-class="animate__animated animate__fadeInUp" leave-active-class="animate__animated animate__fadeOutUp"-->
          <transition :name="route.meta.transition || 'fade'" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </a-config-provider>
    </ElConfigProvider>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from "vue"
  import { ElConfigProvider } from "element-plus"
  import zhCn from "element-plus/es/locale/lang/zh-cn"
  import { RouterView } from "vue-router"
  import antZhCn from "ant-design-vue/es/locale/zh_CN"
  import dayjs from "dayjs"
  import "dayjs/locale/zh-cn"
  dayjs.locale("zh-cn")
  import emitter from '@/utils/eventBus'
  import { createStarCanvas, stopMouseMoveStar } from "@/utils/mouseMoveStar"

  const locale = zhCn
  const antLocale = antZhCn

  const isLoginIn = ref(false)

  onMounted(()=>{
    // createStarCanvas()
  })

  onBeforeUnmount(()=>{
    // stopMouseMoveStar()
  })
</script>

<style scoped lang="less">
  .box {
    width: 100vw;
    height: 100vh;

    overflow: hidden;

    cursor: url("./assets/cursor.cur"), auto;
  }

   //路由切换特效
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 1s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transition: opacity 1s ease;
  }

  //.animate__animated.animate__fadeOutUp{
  //  opacity: 1;
  //  --animate-duration: 10s;
  //}
  //
  //.animate__animated.animate__fadeInUp {
  //  opacity: 1;
  //  --animate-duration: 10s;
  //}
</style>
