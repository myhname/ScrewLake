<template>
  <div class="notes-container">
    <!--  TODO: 留作用于背景特效的渲染  -->
    <div class="ground-effects"></div>
    <div class="toc-main">
      <!--   TODO: 左侧固定定位展示的内容，包括博客简洁等   -->
      <div class="left-fixed"></div>
      <!--   TODO: 目录主体列表   -->
      <div class="notes-toc-card"></div>
      <!--   TODO: 右侧粘性定位，座右铭等个性信息   -->
      <div class="right-sticky"></div>
    </div>
    <!--   TODO: 右下角桌宠   -->
    <div class="desktop-pet-box"></div>
    <!--   TODO: 左下角音乐播放器   -->
    <div class="player-box"></div>
  </div>
</template>

<script setup lang="ts">
  
</script>

<style scoped lang="less">
.notes-container {
  position: relative;
  width: 100%;
}

.ground-effects {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
}

.toc-main {
  width: 70%;
  margin: 20px auto;

  height: 800px;
  background-color: #1a1a1a;
}
</style>