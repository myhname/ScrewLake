<template>
  <div ref="wordCloudContainer" class="word-cloud-container" id="wordCloudContainer"></div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount } from "vue"

const wordCloudContainer = ref<HTMLElement | null>()

const state = reactive({
  containerWidth: 0,
  containerHeight: 0,
  wordList: [
    { label: "CSS", value: 16, color: "#000" },
    { label: "Java Script", value: 16, color: "#000" },
    { label: "Ajax", value: 16, color: "#000" },
    { label: "HTML", value: 16, color: "#000" },
    { label: "Canvas", value: 16, color: "#000" },
    { label: "3D", value: 16, color: "#000" },
    { label: "Vue3", value: 16, color: "#000" },
  ] as Array<LabelData>,
  colorList: ["#e6a38f", "#645884", "#1e80ff", "#e74032", "#59dbc8", "#ffd04b", "#9b9d8e"],
  wordSpanList: [] as Array<{ dom: HTMLElement; top: number; left: number; vX: number; vY: number }>,
  resetTime: 0,
  timer: 0,
})

const randomFontSize = () => {
  return Math.floor(Math.random() * 6) * 2 + 15
}

const randomFontColor = () => {
  let index = Math.floor(Math.random() * 7)
  return state.colorList[index]
}

const initWordCloudSpan = () => {
  state.wordSpanList = []
  state.wordList.forEach((word) => {
    word.color = randomFontColor()
    word.value = randomFontSize()
    const spanDom = document.createElement("span")
    spanDom.style.position = "relative"
    spanDom.style.top = "0"
    spanDom.style.left = "0"
    spanDom.style.display = "inline-block"
    spanDom.style.color = word.color
    spanDom.style.fontSize = word.value + "px"
    spanDom.innerHTML = word.label
    wordCloudContainer.value?.appendChild(spanDom)
    // console.log("词云大小", word.value, spanDom.style.fontSize)
    state.wordSpanList.push({
      dom: spanDom,
      top: 0,
      left: 0,
      vX: Math.random() * 0.5 + 0.5,
      vY: Math.random() * 0.5 + 0.5,
    })
  })
}

const wordFly = () => {
  state.wordSpanList.forEach((item, index) => {
    if (item.dom.offsetLeft + item.left + item.vX + item.dom.offsetWidth > state.containerWidth || item.dom.offsetLeft + item.left + item.vX < 0) {
      item.vX *= -1
    }
    item.left += item.vX
    if (item.dom.offsetTop + item.top + item.vY + item.dom.offsetHeight > state.containerHeight || item.dom.offsetTop + item.top + item.vY < 0) {
      item.vY *= -1
    }
    item.top += item.vY
    // item.dom.style.transform = 'translateX(' + item.left + 'px), translateY(' + item.top + 'px)'
    item.dom.style.transform = 'translate(' + item.left + 'px,' + item.top + 'px)'
  })
  // console.log("词云2：", state.resetTime)
}

const render = () => {
  if (state.resetTime < 100) {
    state.resetTime += 1
    // console.log("词云1：", state.resetTime)
    //防止“栈溢出”
    state.timer = requestAnimationFrame(render.bind(this))
    // console.log("词云3：", state.resetTime)
    state.resetTime = 0
  }
  wordFly()
}

onMounted(() => {
  console.log("词云容器大小：", wordCloudContainer.value)
  state.containerHeight = wordCloudContainer.value?.offsetHeight ?? 350
  state.containerWidth = wordCloudContainer.value?.offsetWidth ?? 250
  initWordCloudSpan()
  render()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(state.timer)
})
</script>

<style scoped lang="less">
.word-cloud-container {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>