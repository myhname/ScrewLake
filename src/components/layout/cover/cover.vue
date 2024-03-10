<template>
  <div class="cover-container" @dblclick="toNotesToc">
    <!--  先实现功能，具体细节可以回头慢慢调整  -->
    <div class="cube-box">
      <Cube/>
    </div>
    <el-icon class="to-container" @click="toNotesToc">
      <ArrowDownBold/>
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import {onMounted, onBeforeUnmount} from 'vue'
import loadJs from "@/utils/loadJS"
import router from "@/router";
import Cube from "@/components/layout/cover/components/Cube.vue";

const toNotesToc = () => {
  router.push("/")
}

onMounted(() => {
  let sakuraCanvas = document.getElementById("canvas_sakura")
  if (!sakuraCanvas) {
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
  }
})

onBeforeUnmount(() => {
  // Tag: 这个算法樱花算法不支持渐变消失，所以引入一个渐变消失的，两者交替
  let sakuraCanvas = document.getElementById("canvas_sakura")
  if (sakuraCanvas) {
    console.log(sakuraCanvas)
    sakuraCanvas.parentNode?.removeChild(sakuraCanvas)
    let sakuraScript = document.getElementById("sakura_script")
    if (sakuraScript) {
      sakuraScript.parentNode?.removeChild(sakuraScript)
    }
  }
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

  display: flex;
  justify-content: center;

  .cube-box {
    position: relative;
    top: 120px;
    left: 100px;
  }

  .to-container {
    position: absolute;
    bottom: 0;
    left: 50%;
    color: #fff;
    transform: translateX(-18px) translateY(0);
    font-size: 40px;
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