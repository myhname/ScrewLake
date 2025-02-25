<template>
  <div id="userCenterDom" class="user-center-container bg-cover" :style="bgUrlComputed(state.bgImg)"
       @scroll="containerScroll">
    <!--  雪花飘落背景  -->
    <div id="snow-container"></div>

    <!--  首屏，用户简介  -->
    <div class="personal-data">
      <div class="personal-avatar">
        <img :src="state.avatar" alt="用户头像"/>
        <div class="ripple-effect-bg"></div>
        <div class="ripple-effect"></div>
      </div>
      <p class="personalized-signature text-shadow">
        <span v-if="state.signature" v-typewriter="{ delay: 100 }">{{ state.signature }}</span>
        <span class="opacity-animation" :style="'--animation-delay: 3s'">_</span>
      </p>
      <div class="personal-card-container">
        <template v-for="i in 4" :key="i">
          <div class="personal-card" :class="`personal-card-${i}`">
            <div class="card-content">{{ i }}</div>
          </div>
        </template>
      </div>
    </div>
    <!--  次屏，个人信息  -->
    <div class="personalized-detail-container">
      <div class="personalized-detail-card">
        <h3 class="personalized-details-title title-font">个人资料</h3>
        <div class="personalized-details">
          <template v-for="(item, index) in state.personalizedDetailsList" :key="index">
            <div class="personalized-details-item">
              <p class="detail-title">{{ item.title }}</p>
              <p class="detail-context">{{ item.context }}</p>
            </div>
          </template>
        </div>
      </div>
    </div>
    <!-- 项目模块介绍 -->
    <div class="personalized-module-container">
      <div class="gsap-sticky-container">
        <div class="module-header">
          模块介绍标题
        </div>
        <div class="module-introduce">
          <div class="module-process">
            <div class="module-process-bar"></div>
          </div>

          <template v-for="i in 4" :key="i">
            <div class="module-card" :class="`module-card-${i}`"
                 :style="`--left-location: ${(i - 1) * state.screenMsg.moduleCardWidth}px;`">模块内容
              {{ i }} - {{ (i - 1) * state.screenMsg.moduleCardWidth }}
            </div>
          </template>
        </div>
      </div>
    </div>
    <!-- 项目迭代及运维日志 -->
    <div class="log-list-container">
      <template v-for="(log, index) in state.logList" :key="index">
        <div :id="`logItem_${index}`" class="personalized-details-item log-item">
          <p class="detail-title">{{ log.time }}</p>
          <p class="detail-context">{{ log.context }}</p>
        </div>
      </template>
    </div>

    <div class="bottom-placeholder"></div>
  </div>
</template>

<script setup lang="ts">
import {reactive, onMounted, onBeforeUnmount, nextTick} from "vue"
import SnowfallManager from '@/utils/snowfallManager';
import {createStarCanvas, stopMouseMoveStar} from "@/utils/mouseFollowed"
import {bgUrlComputed} from "@/utils/loadResource"
import {useConfigStore} from "@/stores/modules/config"
import {startLoading, stopLoading} from "@/hooks/loadingInstance"
import gsap from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// 受 次屏 personalized-detail-container 滚动影响的动画时间线
let tlDetail: gsap.core.Timeline
// 受 次屏 personalized-module-container 滚动影响的动画时间线
let tlModule: gsap.core.Timeline
const snowfallManager = new SnowfallManager({color: '#cccccc'});
const configStore = useConfigStore()
const state = reactive({
  screenMsg: {
    width: 0,
    height: 0,
    moduleCardWidth: 0,
  },

  bgImg: new URL("/src/assets/img/user-center-bg.jpg", import.meta.url).href,
  avatar: "",
  signature: "",
  personalizedDetailsList: [
    {
      title: "职业",
      context: "web前端",
    },
    {
      title: "星座",
      context: "天秤",
    },
    {
      title: "爱好",
      context: "卡通、动漫",
    },
  ],
  logList: [
    {
      time: "2025-01-21 12:00:00",
      context: "日志标题1",
    },
    {
      time: "2025-01-21 12:00:00",
      context: "日志标题1",
    },
    {
      time: "2025-01-21 12:00:00",
      context: "日志标题1",
    },
    {
      time: "2025-01-21 12:00:00",
      context: "日志标题1",
    },
    {
      time: "2025-01-21 12:00:00",
      context: "日志标题1",
    },
    {
      time: "2025-01-21 12:00:00",
      context: "日志标题1",
    },
    {
      time: "2025-01-21 12:00:00",
      context: "日志标题1",
    },
    {
      time: "2025-01-21 12:00:00",
      context: "日志标题1",
    },
    {
      time: "2025-01-21 12:00:00",
      context: "日志标题1",
    },
    {
      time: "2025-01-21 12:00:00",
      context: "日志标题1",
    },
  ]
})

/**
 * 滚动事件
 * @param event
 */
const containerScroll = (event: Event) => {
  if (!(event.target instanceof HTMLElement)) return;

  // 获取屏幕高度和宽度
  const screenHeight = state.screenMsg.height || window.innerHeight;
  const screenWidth = state.screenMsg.width || window.innerWidth;

  // 获取模块列表
  const targets = document.getElementsByClassName("module-card");
  const scrollTop = event.target.scrollTop;

  // 遍历模块，添加或移除高亮类
  Array.from(targets).forEach((target, index) => {
    let boundary = index === 0 ? screenHeight * 1.4 : (screenHeight * 2 + screenWidth * 0.65 * index - screenWidth * 0.45)
    if (scrollTop >= boundary) {
      target.classList.add("highlight-module-card");
    } else {
      target.classList.remove("highlight-module-card");
    }
  });
}

/**
 * 注册动画
 */
const initGsap = () => {
  console.log("注册动画-个人中心")

  tlDetail = gsap.timeline({
    scrollTrigger: {
      scroller: "#userCenterDom", // 指定哪个元素的滚动会触发此动画
      scrub: true, // 平滑过渡
      // markers: true,
      trigger: ".personalized-detail-container",
      start: "top top",
      end: "bottom bottom",
    },
  })

  tlDetail.to(".personal-data", {
    translateY: state.screenMsg.height != 0 ? state.screenMsg.height : window.screenY,
    // background: "red",
    opacity: 0 /* 使内容区域逐渐消失 */,
    filter: "blur(5px)" /* 添加模糊效果 */,
    ease: "none",
  })

  for (let i = 1; i <= 4; i++) {
    let translateStr = i > 2 ? "50vw" : "-50vw"
    tlDetail.to(
        `.personal-card-${i}`,
        {
          translateX: translateStr,
          ease: "none",
        },
        "<"
    )
  }

  tlDetail.to(
      ".personalized-detail-card",
      {
        width: "90%",
        ease: "none",
      },
      "<"
  )

  tlModule = gsap.timeline({
    scrollTrigger: {
      scroller: "#userCenterDom", // 指定哪个元素的滚动会触发此动画
      scrub: true, // 平滑过渡
      // markers: true,
      trigger: ".personalized-module-container",
      start: "top top",
      end: `+=${state.screenMsg.moduleCardWidth * 3}`,
    },
  })

  tlModule.to(".gsap-sticky-container", {
    translateY: state.screenMsg.moduleCardWidth * 3,
    ease: "none",
  })

  tlModule.to(".module-process-bar", {
    width: state.screenMsg.moduleCardWidth * 4,
    ease: "none",
  }, "<")

  tlModule.to(".module-introduce", {
    // width: state.screenMsg.moduleCardWidth * 3,
    translateX: `${-state.screenMsg.moduleCardWidth * 3}px`,
    ease: "none",
  }, "<")

  // for (let i = 1; i <= 4; i++) {
  //   tlModule.fromTo(
  //       `.module-card-${i}`,
  //       {
  //         opacity: 0.5,
  //       },
  //       {
  //         opacity: 1,
  //         translateX: `${-state.screenMsg.moduleCardWidth * 3}px`,
  //         ease: "none",
  //       },
  //       "<"
  //   )
  // }

  state.logList.forEach((logItem, index) => {
    // 创建 ScrollTrigger
    ScrollTrigger.create({
      scroller: "#userCenterDom", // 指定哪个元素的滚动会触发此动画
      trigger: `#logItem_${index}`,
      start: "top center", // 当元素顶部到达容器中心时开始动画
      end: "bottom center", // 当元素底部离开容器中心时结束动画
      scrub: true, // 平滑过渡效果
      onEnter: (self) => {
        // 当元素进入视口中心时改变其 opacity 到 1
        gsap.to(self.trigger, {opacity: 1, duration: 0.3})
      },
      onLeave: (self) => {
        // 当元素离开视口中心下方时恢复其 opacity 到 0.5
        gsap.to(self.trigger, {opacity: 0.5, duration: 0.3})
      },
      onEnterBack: (self) => {
        // 当元素再次进入视口中心时改变其 opacity 到 1
        gsap.to(self.trigger, {opacity: 1, duration: 0.3})
      },
      onLeaveBack: (self) => {
        // 当元素离开视口中心上方时恢复其 opacity 到 0.5
        gsap.to(self.trigger, {opacity: 0.5, duration: 0.3})
      },
    })
  })
}

/**
 * 窗口变化时重新加载页面，便于动画适配
 */
const resetGsap = () => {
  // TODO: 重新注册动画之后，仍然有一部分距离没办法响应式变化，没找到问题，暂时方案：强制重新加载页面；开发时，会有加载两次的bug，但是从其它页面跳转过来就很正常，没找到原因，注释掉重定向之后也没有输出
  location.reload();
  console.log("监听到窗口变化")
}

/**
 * 初始化个人中心数据
 */
const initStateParams = async () => {
  startLoading({
    target: "#userCenterDom"
  })

  state.avatar = new URL(configStore.systemState.avatar, import.meta.url).href

  stopLoading()
}

onMounted(() => {
  initStateParams()

  if (document.getElementById("userCenterDom")) {
    let dom = document.getElementById("userCenterDom") as HTMLElement
    createStarCanvas(dom)

    state.screenMsg.height = dom.offsetHeight
    state.screenMsg.width = dom.offsetWidth
    console.log("屏幕大小：", dom, state.screenMsg)
  }

  snowfallManager.init("snow-container")

  // TODO: 屏幕大小变化时候没法自动更新动画，这个稍后处理一下
  state.screenMsg.moduleCardWidth = (state.screenMsg.width != 0 ? state.screenMsg.width : window.screenX) * 0.65
  nextTick(() => {
    initGsap()
  })

  // 可以注册多个
  window.addEventListener("resize", resetGsap)
})

onBeforeUnmount(() => {
  if (document.getElementById("userCenterDom")) {
    stopMouseMoveStar(document.getElementById("userCenterDom") as HTMLElement)
  }
  snowfallManager.destroy()

  tlDetail.clear()
  tlModule.clear()

  window.removeEventListener("resize", resetGsap)
})
</script>

<style scoped lang="less">
.user-center-container {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: center;
  color: #fff;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .personal-data {
    --avatar-size: clamp(120px, 20vh, 150px); /* 头像大小 */

    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%; /* 确保内容区域占满整个容器 */
    color: #fefcff;
    display: flex;
    flex-direction: column;

    .text-shadow {
      text-shadow: 0 0 10px #fff, 0 0 15px #fff;
    }

    .personal-avatar {
      width: var(--avatar-size);
      height: var(--avatar-size);
      margin: max(15vh, 70px) auto 2%;
      position: relative;
      padding: 17px;

      img {
        width: calc(var(--avatar-size) - 34px);
        height: calc(var(--avatar-size) - 34px);
        border-radius: 50%;
      }

      .ripple-effect-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: var(--avatar-size);
        height: var(--avatar-size);
        border: 2px solid #e1afbe;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        z-index: 3;
        opacity: 0;
        -webkit-animation: warn 1.5s ease-out;
        -moz-animation: warn 1.5s ease-out;
        animation: warn 1.5s ease-out;
        -webkit-animation-iteration-count: infinite;
        -moz-animation-iteration-count: infinite;
        animation-iteration-count: infinite;
        box-shadow: 1px 1px 30px #000;
      }

      .ripple-effect {
        position: absolute;
        width: var(--avatar-size);
        height: var(--avatar-size);
        top: 0;
        left: 0;
        border: 1px solid #e1afbe;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        z-index: 3;
        opacity: 0;
        -webkit-animation: warn1 1.5s ease-out;
        -moz-animation: warn1 1.5s ease-out;
        animation: warn1 1.5s ease-out;
        -webkit-animation-iteration-count: infinite;
        -moz-animation-iteration-count: infinite;
        animation-iteration-count: infinite;
        box-shadow: 1px 1px 30px #000;
      }
    }

    .personalized-signature {
      font-size: clamp(20px, 1.2vw, 25px);
      margin: 0 5%;
      padding-bottom: 30px;
      border-bottom: dashed 2px #6a6363;
      line-height: 1.36;
      letter-spacing: 0.1em;

      .opacity-animation {
        /* opacity: 1; */
        animation: fadeInOut 0.7s infinite alternate ease-in-out var(--animation-delay);
      }
    }

    .personal-card-container {
      width: 100%;
      padding: 0 5%;
      margin: auto;
      display: flex;
      flex-direction: row;
      column-gap: 2%;
      overflow: hidden;

      .personal-card {
        flex: 1;
        position: relative; /* 为伪元素提供定位上下文 */
        overflow: hidden; /* 确保内容不会溢出 */
        box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
        border: 1px solid #e4e7ed;
        border-radius: 4px;

        &::before {
          content: "";
          display: block;
          padding-bottom: clamp(80%, 90%, 120%); /* 基于宽度的自适应高度 */
        }

        .card-content {
          position: absolute; /* 使卡片内容填充整个卡片 */
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .personalized-detail-container {
    display: flex;
    padding-top: 100vh;
    width: 100vw;
    height: 200vh;
    position: relative;
    z-index: 5;

    .personalized-detail-card {
      margin: max(60px, 5vh) auto 0;
      width: 70%;
      height: 85vh;
      background-color: rgba(0, 0, 0, 0.8);
      border: 1px solid #e4e7ed;
      border-radius: 5px;
      box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);

      .personalized-details {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        margin: 30px 5%;
      }
    }
  }

  .personalized-module-container {
    height: calc(100vh + 195vw);
    width: 80vw;
    margin: 0 auto;
    // background-color: #e1afbe;
    position: relative;
    overflow: hidden;

    .gsap-sticky-container {
      width: 100%;
      height: 100vh;
      position: relative;

      .module-header {
        width: 100%;
        height: 40vh;
        //background-color: yellow;
      }

      .module-introduce {
        height: 60vh;
        width: 260vw;
        //background-color: red;
        position: relative;

        .module-process {
          position: absolute;
          top: calc(30vh - 1px);
          left: 0;
          width: 260vw;
          height: 2px;
          background: rgba(254, 252, 255, 0.2);
          z-index: 5;

          .module-process-bar {
            height: 2px;
            width: 65vw;
            background-color: rgba(254, 252, 255, 1);
          }
        }

        .module-card {
          position: absolute;
          margin-top: 5vh;
          left: var(--left-location);
          display: inline-block;
          height: 50vh;
          width: 65vw;
          //background-color: aqua;
          opacity: 0.8;
        }
      }
    }
  }

  .log-list-container {
    margin: 0 auto;
    padding: 20px 0;
    width: 90%;
    background-color: #000;

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .personalized-details-item {
    width: 300px;
    //opacity: 0.5;
    padding: 20px 0;

    p {
      margin: 0;
      padding: 5px;
    }

    .detail-title {
      padding: 5px 80px;
      border-bottom: solid 2px #605e5e;
      font-size: 14px;
    }

    .detail-context {
      font-size: 18px;
    }
  }

  .bottom-placeholder {
    width: 100px;
    height: 500px;
  }
}

@keyframes warn {
  0% {
    transform: scale(0.3);
    -webkit-transform: scale(0.3);
    opacity: 0;
  }
  25% {
    transform: scale(0.3);
    -webkit-transform: scale(0.3);
    opacity: 0.1;
  }
  50% {
    transform: scale(0.5);
    -webkit-transform: scale(0.5);
    opacity: 0.3;
  }
  75% {
    transform: scale(0.8);
    -webkit-transform: scale(0.8);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    -webkit-transform: scale(1);
    opacity: 0;
  }
}

@keyframes warn1 {
  0% {
    transform: scale(0.3);
    -webkit-transform: scale(0.3);
    opacity: 0;
  }
  25% {
    transform: scale(0.3);
    -webkit-transform: scale(0.3);
    opacity: 0.1;
  }
  50% {
    transform: scale(0.3);
    -webkit-transform: scale(0.3);
    opacity: 0.3;
  }
  75% {
    transform: scale(0.5);
    -webkit-transform: scale(0.5);
    opacity: 0.5;
  }
  100% {
    transform: scale(0.8);
    -webkit-transform: scale(0.8);
    opacity: 0;
  }
}

@keyframes fadeInOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>

<style lang="less">
.module-card.highlight-module-card {
  opacity: 1 !important;
}
</style>