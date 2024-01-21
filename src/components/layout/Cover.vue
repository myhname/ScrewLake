<template>
  <div class="cover">
    <div class="cover-text"></div>
    <div class="cover-avatar"></div>
    <el-icon class="to-container" @click="toNotesToc"><ArrowDownBold /></el-icon>
  </div>
  <div ref="notesToc" class="container">
    <notes-index />
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from "vue"
  import notesIndex from "@/views/note/notesIndex.vue"
  import loadJs from "@/utils/loadJS"
  import emitter from '@/utils/eventBus'

  const notesToc = ref<HTMLElement>()

  const toNotesToc = () => {
    if(notesToc.value) {
      // note: offsetTop是相对于父元素，scrollHeight是相对于屏幕，scrollTop是浏览器自带的滚动条滚动的距离
     console.log("位置",notesToc.value.offsetTop, notesToc.value.scrollHeight, notesToc.value.scrollTop)
     emitter.emit("scroll-to-notes", notesToc.value.offsetTop)
    }
  }

  onMounted(() => {
    loadJs("https://cdn.jsdelivr.net/gh/Ukenn2112/UkennWeb@3.0/index/web.js")
      .then((res) => {
        console.log(res, "樱花特效加载成功")
      })
      .catch((err) => {
        console.log("错误：", err)
      })
      .finally(() => {
        console.log("最终结束")
      })
  })
</script>

<style scoped lang="less">
  // 总体布局
  .cover {
    height: 100%;
    width: 100%;
    position: relative;
    left: 0;
    top: 0;
    padding: 0 15%;

    background-image: url("../../assets/image/伽魔.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center top;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .to-container {
      position: absolute;
      bottom: 0;
      left: 50%;
      color: #fff;
      transform: translateX(-18px) translateY(0);
      font-size: 40px;
      cursor: pointer;
      animation: pullDown 2s infinite;
    }
  }

  .container {
    height: 100%;
    width: 100%;
    position: relative;
  }

  @keyframes pullDown {
    0% {
      transform: translateX(-18px) translateY(0);
    }
    50% {
      transform: translateX(-18px) translateY(-10px);
    }
    100% {
      transform: translateX(-18px) translateY(0);
    }
  }
</style>
