<template>
  <el-menu v-for="menu in props.menuList" active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" router :default-active="router.currentRoute.value.fullPath" text-color="#fff" @open="handleOpen" @close="handleClose">
    <el-sub-menu v-if="menu.children && menu.children.length" :index="menu.path">
      <template #title>
        <MyIcons :icon="menu.icon" :style="myIconsFont" />
        <span class="menu-title"> {{ menu.meta.title }} </span>
      </template>
      <el-menu-item v-for="subMenu in menu.children" :index="subMenu.path">
        <span class="menu-title"> {{ subMenu.meta.title }} </span>
      </el-menu-item>
    </el-sub-menu>
    <el-menu-item v-else :index="menu.path">
      <template #title>
        <MyIcons :icon="menu.icon" :style="myIconsFont" />
        <span class="menu-title"> {{ menu.meta.title }} </span>
      </template>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
  import { ref } from "vue"
  import { useRouter } from "vue-router"
  import MyIcons from "@/components/MyIcons.vue"

  const router = useRouter()

  const props = defineProps({
    menuList: {
      type: Object,
      required: true,
    },
  })

  const myIconsFont = ref("font-size: 1.5rem")

  const handleOpen = () => {
    // key: string, keyPath: string[]
    // console.log("菜单展开", key, keyPath)
  }
  const handleClose = () => {
    // key: string, keyPath: string[]
    // console.log("菜单折叠", key, keyPath)
  }
</script>

<style scoped lang="less">
  .menu-title {
    font-size: 1rem;
  }
  .svg-icon {
    margin-right: 5px;
  }
</style>
