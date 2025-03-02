<template>
  <div class="modules-container">
    <component :is="state.selectComponent" :key="state.selectComponentKey"></component>
  </div>
</template>

<script setup lang="ts">
import {reactive, onMounted} from "vue";
import GsapExample from "@/views/modules/components/GsapExample.vue";
import * as ModuleType from "@/types/module"
import {useRoute} from "vue-router";

const route = useRoute()
const state = reactive({
  selectComponent: GsapExample,
  selectComponentKey: "gsapExample",
  componentsTabs: [{
    label: "gsap示例",
    key: "gsapExample",
    component: GsapExample
  }] as Array<ModuleType.ComponentTab>,
})

onMounted(() => {
  if (route.query && route.query.key) {
    let targetTab = state.componentsTabs.find((item: ModuleType.ComponentTab) => item.key === route.query.key)

    if (targetTab) {
      state.selectComponent = targetTab.component
      state.selectComponentKey = targetTab.key
    }
  }
})
</script>

<style scoped lang="less">
.modules-container {
  position: relative;
}
</style>