<template>
  <div class="cover-container">
    <el-icon class="to-container" @click="toNotesToc"><ArrowDownBold /></el-icon>
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'
  import loadJs from "@/utils/loadJS"

  const toNotesToc = () => {

  }

  onMounted(() => {
    loadJs("https://cdn.jsdelivr.net/gh/Ukenn2112/UkennWeb@3.0/index/web.js")
        .then((res: any) => {
          console.log(res, "樱花特效加载成功")
        })
        .catch((err: any) => {
          console.log("错误：", err)
        })
        .finally(() => {
          console.log("最终结束")
        })
  })
</script>

<style scoped lang="less">
.cover-container {
  height: 100%;
  width: 100%;
  position: relative;
  background-image: url("../../../assets/image/伽魔.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;

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