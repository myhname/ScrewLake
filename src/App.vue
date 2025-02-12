<template>
  <div class="box">
    <ElConfigProvider :locale="locale">
      <router-view v-slot="{ Component, route }">
        <transition :name="route.meta.transition || 'fade'" mode="out-in">
          <component :is="Component"/>
        </transition>
      </router-view>
    </ElConfigProvider>
  </div>
</template>

<script setup lang="ts">
import {RouterView} from "vue-router"
import {ElConfigProvider} from "element-plus"
import zhCn from "element-plus/es/locale/lang/zh-cn"
import dayjs from "dayjs"
import "dayjs/locale/zh-cn"

import {watchWindowSize} from "@/hooks/screen"
import {useTheme} from "@/hooks/theme"

dayjs.locale("zh-cn")
const locale = zhCn

// watchWindowSize 内部已经有了 onMounted 生命周期，所以不能再放到 onMounted 中嵌套回调
watchWindowSize()
useTheme()
</script>

<style scoped lang="less">
.box {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
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
</style>
