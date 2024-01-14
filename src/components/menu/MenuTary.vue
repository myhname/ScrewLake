<template>
  <div class="menu-tary">
    菜单托盘
    <transition name="menu-tary-btn">
      <UnorderedListOutlined v-if="!showTary" @click="expandTary" />
      <CloseOutlined v-else @click="foldTary" />
    </transition>

    <Menu />
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue"
  import { UnorderedListOutlined, CloseOutlined } from "@ant-design/icons-vue"
  import Menu from "./components/Menu.vue"

  const showTary = ref(false)

  const expandTary = () => {
    showTary.value = true
  }

  const foldTary = () => {
    showTary.value = false
  }
</script>

<style lang="less" scoped>
    .menu-tary {
      position: absolute;
      right: 0;
      top: 0;
      z-index: 999;

      .anticon {
        font-size: 25px;
        color: #fff;
        background-color: #1f1f1f;
        padding: 7px;
        border-radius: 50%;
      }
    }

    /*menu-tary-btn*/
  .menu-tary-btn-leave-active, .menu-tary-btn-enter-active{
    transition: all 0.4s;
  }
  .menu-tary-btn-enter{
    opacity: 0;
    transform: translateX(-30px);
  }
  .menu-tary-btn-leave-to{
    opacity: 0;
    transform: translateX(30px);
  }
</style>
