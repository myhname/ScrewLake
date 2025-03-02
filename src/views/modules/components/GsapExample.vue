<template>
  <div class="gsap-example-container">
    <!-- 单个元素动画演示 -->
    <div class="animation-group">
      <div class="box box-1"></div>
      <el-button class="cursor-self" @click="start1">执行 gsap.to() 动画</el-button>
    </div>

    <div class="animation-group">
      <div class="box box-2"></div>
      <el-button class="cursor-self" @click="start2">执行 gsap.from() 动画</el-button>
    </div>

    <div class="animation-group">
      <div class="box box-3"></div>
      <el-button class="cursor-self" @click="start3">执行 gsap.fromTo() 动画</el-button>
    </div>

    <div class="animation-group">
      <div class="box box-4"></div>
      <el-button class="cursor-self" @click="start4">执行 gsap.set() 设置</el-button>
    </div>

    <!-- 时间线动画演示 -->
    <div class="timeline-group">
      <div class="box green"></div>
      <div class="box purple"></div>
      <div class="box orange"></div>
      <div class="btn-inline">
        <el-button class="cursor-self" @click="start5">执行时间线动画</el-button>
        <el-button class="cursor-self" @click="tlAction('pause')">暂停</el-button>
        <el-button class="cursor-self" @click="tlAction('play')">播放</el-button>
        <el-button class="cursor-self" @click="tlAction('restart')">重新执行</el-button>
      </div>
    </div>

    <!-- 注册动画函数演示 -->
    <div class="animation-group">
      <div class="box box-5"></div>
      <el-button class="cursor-self" @click="start6">执行注册函数动画</el-button>
    </div>

    <div class="animation-group">
      <div class="box box-6"></div>
      <el-button class="cursor-self" @click="start7">demo</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted} from "vue"
import gsap from "gsap"

// 创建时间线实例
const tl = gsap.timeline()

// 注册自定义动画效果
gsap.registerEffect({
  name: "move",
  effect: (targets: string | HTMLElement, config: { duration: number; x: number; y: number; rotate: number }) => {
    return gsap.to(targets, {
      duration: config.duration,
      y: config.y,
      x: config.x,
      rotate: config.rotate,
      scaleX: -1,
      onComplete: () => {
        console.log("移动完成", JSON.stringify(config))
      },
    })
  },
  defaults: {x: 0, y: 0, duration: 1, rotate: 360},
  extendTimeline: true,
})

// 定义 gsap.to() 动画函数
const start1 = () => {
  gsap.to(".box-1", {duration: 2, x: 200, rotation: 360, ease: "power1.inOut"})
}

// 定义 gsap.from() 动画函数
const start2 = () => {
  gsap.from(".box-2", {duration: 2, x: 200, rotation: 360, ease: "power1.inOut"})
}

// 定义 gsap.fromTo() 动画函数
const start3 = () => {
  gsap.fromTo(".box-3", {x: 0, rotation: 0}, {duration: 2, x: 200, rotation: 360, ease: "power1.inOut"})
}

// 定义 gsap.set() 设置函数
const start4 = () => {
  gsap.set(".box-4", {x: 200, rotation: 360})
}

// 定义时间线动画函数
const start5 = () => {
  tl.clear() // 清除之前的动画
  tl.to(".green", {
    x: 600,
    duration: 1,
  })
  tl.to(".purple", {
    x: 600,
    duration: 1,
  })
  tl.to(".orange", {
    x: 600,
    duration: 1,
  })
}

// 定义时间线控制函数
const tlAction = (action: "pause" | "play" | "restart") => {
  switch (action) {
    case "pause":
      tl.pause()
      break
    case "play":
      tl.play()
      break
    case "restart":
      tl.restart()
      break
  }
}

// 定义执行注册动画函数
const start6 = () => {
  tl.move(".box-5", {x: 200, y: 200, duration: 2})
}

const tl2 = gsap.timeline({paused: true})
const initGsap = () => {
  tl2.to(".box-6", {
    duration: 2,
    width: 0,
    opacity: 0,
    ease: "power1.inOut",
    onComplete: () => {
      console.log("动画完成")
    },
  })
  tl2.reverse()
}
const start7 = () => {
  tl2.reversed(!tl2.reversed())
}

onMounted(() => {
  initGsap()
})
</script>

<style scoped lang="less">
.data-insigh {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.animation-group,
.timeline-group {
  display: flex;
  flex-direction: column;
  // align-items: center;
  gap: 10px;

  button {
    width: 180px;
  }
}

.box {
  width: 100px;
  height: 100px;
  background-color: #000;
  border-radius: 10px;
}

.green {
  background-color: green;
}

.purple {
  background-color: purple;
}

.orange {
  background-color: orange;
}
</style>