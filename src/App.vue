<template>
  <div class="box">
    <ElConfigProvider :locale="locale">
      <a-config-provider :locale="antLocale">
        <router-view v-slot="{ Component, route }">
          <!-- done: 这种写法理论上支持指定标签页不同切换特效，稍后可以实践一下，这里的报错就无语，抄的官网的示例，不兼容ts能咋办 -->
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
    // 接收登录页面跳转信息，登录页面不显示菜单托盘
    emitter.on('is-login-in',()=>{
      isLoginIn.value = true
    })
    emitter.on('is-login-out',()=>{
      isLoginIn.value = false
    })

    createStarCanvas()
  })

  onBeforeUnmount(()=>{
    emitter.off('is-login-in')
    emitter.off('is-login-out')

    stopMouseMoveStar()
  })
</script>

<style scoped lang="less">
  .box {
    width: 100vw;
    height: 100vh;

    overflow: hidden;
  }

  // 路由切换特效
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
