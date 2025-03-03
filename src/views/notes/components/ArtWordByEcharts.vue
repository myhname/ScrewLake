<template>
  <div :id="props.id" class="diagram-content"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import * as echarts from "echarts/core"
import { GraphicComponent, GraphicComponentOption } from "echarts/components"
import { CanvasRenderer } from "echarts/renderers"

echarts.use([GraphicComponent, CanvasRenderer])

type EChartsOption = echarts.ComposeOption<GraphicComponentOption>

const props = defineProps({
  id: {
    type: String,
    default: "artWordByEcharts",
    required: true,
  },
  context: {
    type: String,
    default: "渲染效果",
    required: true,
  },
  fontSize: {
    type: Number,
    default: 45
  }
})

const chartDom = ref<any>()

const initEcharts = () => {
  if (!document.getElementById(props.id)) return
  console.log("获取")
  chartDom.value = echarts.init(document.getElementById(props.id))

  let option: EChartsOption = {
    graphic: {
      elements: [
        {
          type: "text",
          left: "center",
          top: "center",
          style: {
            text: props.context,
            fontSize: props.fontSize,
            fontWeight: "bold",
            lineDash: [0, 200],
            lineDashOffset: 0,
            fill: "transparent",
            stroke: "#000",
            lineWidth: 1,
          },
          keyframeAnimation: {
            duration: 3000,
            loop: true,
            keyframes: [
              {
                percent: 0.7,
                style: {
                  fill: "transparent",
                  lineDashOffset: 200,
                  lineDash: [200, 0],
                },
              },
              {
                // Stop for a while.
                percent: 0.8,
                style: {
                  fill: "transparent",
                },
              },
              {
                percent: 1,
                style: {
                  fill: "#d3d3d3",
                },
              },
            ],
          },
        },
      ],
    },
  }

  chartDom.value.setOption(option)
}

const clearEchart = () => {
  if (chartDom.value) {
    if (!document.getElementById(props.id)) {
      return
    }
    echarts.dispose(document.getElementById(props.id)!)
  }
}

onMounted(() => {
  initEcharts()
})
</script>

<style scoped lang="less">
.diagram-content {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>