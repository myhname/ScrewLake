import {ElLoading, type LoadingOptions} from 'element-plus'
import {ref} from "vue";

interface ElLoadingInstanceType {
    close: Function
}

const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `
const defaultOptions: LoadingOptions = {
    lock: true,
    text: "加载中...",
    background: "rgba(122, 122, 122, 0.8)",
    svg,
    svgViewBox: "10, -10, 50, 50",
}
const loadingInstance = ref<ElLoadingInstanceType | null>(null)

export const startLoading = (options: LoadingOptions) => {
    loadingInstance.value = ElLoading.service({
        ...defaultOptions,
        ...options,
    })
}

export const stopLoading = () => {
    loadingInstance.value?.close()
    loadingInstance.value = null
}