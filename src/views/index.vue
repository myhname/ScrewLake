<template>
  <div class="common-layout">
    <div class="top-menu-box" :class="{ 'top-flat': topHeight }">
      <top-menu />
    </div>
    <div class="main" @scroll="containerScrolling">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from "vue"
  import TopMenu from "@/components/menu/TopMenu.vue"
  import { RouterView } from "vue-router"

  const topHeight = ref(false)

  const containerScrolling = (event: any) => {
    // console.log("滚动", event, event.target.scrollTop)
    if (event.target.scrollTop) {
      topHeight.value = true
    } else {
      topHeight.value = false
    }
  }

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

</style>
