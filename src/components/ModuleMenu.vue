<template>
  <div id="menuContainer" class="module-menu-container" :class="{ 'is-tray': props.isTray}"
       :style="`--animationState: ${animationState}`">
    <div class="container">
      <template v-for="(menuItem, index) in props.menuList" :key="index">
        <div class="container-item" :class="computedClassStr(index)" @mouseenter="changeModule(index)"
             @click="targetTo(menuItem.modulePath, index)">
          <div class="bg-item" :style="bgUrlComputed(menuItem.bgImg)"></div>
          <div class="text-item">{{ menuItem.title }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted} from "vue"
import router from "@/router";
import {bgUrlComputed} from "@/utils/loadResource"
import gsap from "gsap"

let tl = gsap.timeline()

export interface ModuleMenuType {
  type: number // 0 正常使用；1 当前页；2 禁用
  modulePath: string // route path ，不带 "/"
  bgImg: string // 背景图片路径，绝对路径
  title: string //
}

interface PropsType {
  isTray: boolean
  menuList: Array<ModuleMenuType>
}

const props = withDefaults(defineProps<PropsType>(), {
  isTray: false,
  menuList: () => ([
    {
      type: 1,
      modulePath: "home",
      bgImg: new URL("/src/assets/img/home-bg1.jpg", import.meta.url).href,
      title: "首页",
    },
    {
      type: 0,
      modulePath: "notes",
      bgImg: new URL("/src/assets/img/home-bg2.jpg", import.meta.url).href,
      title: "笔记",
    },
    {
      type: 2,
      modulePath: "accountBook",
      bgImg: new URL("/src/assets/img/home-bg3.png", import.meta.url).href,
      title: "随笔",
    },
    {
      type: 2,
      modulePath: "noteModule",
      bgImg: new URL("/src/assets/img/home-bg4.jpg", import.meta.url).href,
      title: "游戏",
    },
    {
      type: 0,
      modulePath: "modules",
      bgImg: new URL("/src/assets/img/home-bg5.jpg", import.meta.url).href,
      title: "组件",
    },
  ])
})

const className = ["A", "B", "C", "D", "E"]

const animationState = ref("paused")

const emits = defineEmits(["change-module"])

const computedClassStr = (index: number) => {
  let str = className[index] + " "
  if (props.menuList[index].type === 0) {
    str += "cursor-pointer"
  } else if (props.menuList[index].type === 2) {
    str += "cursor-no-drop"
  }
  return str
}

const changeModule = (index: number) => {
  console.log("图片：", props.menuList[index])
  emits("change-module", index)
}

const targetTo = (target: string, index: number) => {
  console.log("输出")
  if (!props.menuList[index].type) {
    router.push("/" + target)
  }
}

/**
 * 加载动画
 */
const initAnimation = () => {
  let dom = document.getElementById("menuContainer")
  if (!dom) {
    console.error("未能成功加载元素")
  }
  // TODO: 先不考虑窗口变化
  let circleR = Math.max(dom!.offsetHeight, dom!.offsetWidth)
  let durationTime = 2
  tl.to(".module-menu-container", {
    clipPath: `circle(${circleR}px at 50% 50%)`,
    duration: durationTime,
    immediateRender: false, // 确保动画立即渲染
    overwrite: true, // 确保动画不会被其他动画覆盖
    onComplete: () => {
      let dom = document.getElementById("menuContainer")
      if (dom) {
        requestAnimationFrame(() => {
          dom!.style.clipPath = `circle(${circleR}px at 50% 50%)`
        })
      }
    },
  })
  let sunDom = dom!.getElementsByClassName("container")
  let delay: number
  if (sunDom && sunDom.length) {
    delay = Math.min(dom!.offsetHeight, dom!.offsetWidth) * 0.55 / circleR * durationTime
  } else {
    delay = durationTime / 2
  }
  let timer = setTimeout(() => {
    animationState.value = "running"
    clearTimeout(timer)
  }, delay * 1000)
}

onMounted(() => {
  animationState.value = props.isTray ? "paused" : "running"

  if (props.isTray) {
    initAnimation()
  }
})
</script>

<style lang="less" scoped>
.module-menu-container {
  position: fixed;
  left: 50px;
  top: 50px;
  width: calc(100vw - 50px);
  height: calc(100vh - 50px);

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .container {
    --rotation: 360deg;
    --animation-state: var(--animationState);
    width: 55vmin;
    height: 55vmin;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 4px;
    grid-template-areas:
        "E B B"
        "E A C"
        "D D C";

    &:hover {
      --animation-state: paused;
    }

    .A {
      --translate-x: 0;
      --translate-y: 0;
      --scale-item: 1;
      grid-area: A;
    }

    .B {
      --translate-x: 5%;
      --translate-y: -5%;
      --scale-item: 1.1;
      grid-area: B;
    }

    .C {
      --translate-x: 5%;
      --translate-y: 5%;
      --scale-item: 1.1;
      grid-area: C;
    }

    .D {
      --translate-x: -5%;
      --translate-y: 5%;
      --scale-item: 1.1;
      grid-area: D;
    }

    .E {
      --translate-x: -5%;
      --translate-y: -5%;
      --scale-item: 1.1;
      grid-area: E;
    }

    .container-item {
      position: relative;
      border: 3px solid #431312;
      border-radius: 5px;
      overflow: hidden;
      -webkit-mask: linear-gradient(135deg, #000c 40%, #000, #000c 60%) 100% 100%/250% 250%;
      transition: all 0.4s;

      &:hover {
        -webkit-mask-position: 0 0;
        transform: translate(var(--translate-x), var(--translate-y)) scale(var(--scale-item));
      }

      .bg-item {
        width: 200%;
        height: 200%;
        position: absolute;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        --rotation: -360deg;
      }

      .text-item {
        //padding: 5px 10px;
        --rotation: -360deg;
        z-index: 2;
        font-size: 20px;
        font-weight: 800;
        color: #000;

        //-webkit-mask: url("../../../assets/svg/bgShadow.svg");
      }
    }
  }


  .container,
  .bg-item,
  .text-item {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    animation: 15s scale-up both linear infinite;
    animation-play-state: var(--animation-state);
  }

  .bg-other {
    width: 100px;
    height: 100px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

}

.is-tray {
  clip-path: circle(0 at 50% 50%);
  background-color: rgba(0, 0, 0, 0.6);
}

@keyframes scale-up {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(var(--rotation));
  }
}
</style>