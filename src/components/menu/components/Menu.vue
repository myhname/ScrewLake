<template>
  <div class="menu">
    <!-- <ElementPlusMenu :menuList="state.menuList" /> -->
    <ADVMenu :menuList="state.menuList" />
  </div>
</template>

<script setup lang="ts">
  import { reactive, onMounted } from "vue"
  import { ElMessage } from "element-plus"
  // import ElementPlusMenu from "./ElementPlusMenu.vue"
  import ADVMenu from "./ADVMenu.vue"
  import router from "@/router"
  // note: 直接组件内加载会使得icon名称被当作字符串解析，所以要全局挂载

  interface MenuList {
    key: number
    name: string
    path: string
    component?: string
    children?: MenuList[]
    meta: MenuMeta
    icon?: string
  }

  interface MenuMeta {
    title: string
  }

  const state = reactive({
    menuList: [] as MenuList[],
    openKeys: "",
    selectedKeys: "",
    collapsed: false,
  })

  onMounted(() => {
    let menuList = localStorage.getItem("menuList")
    if (menuList != null) {
      state.menuList = [] as MenuList[]
      let menuArray = JSON.parse(menuList)
      menuArray.forEach((menu: any) => {
        state.menuList.push({
          key: menu.id,
          children: menu.children,
          component: menu.component,
          meta: { title: menu.meta.title },
          icon: menu.icon,
          name: menu.name,
          path: menu.path,
        })
      })
      // console.log("菜单", state.menuList)
    } else {
      ElMessage({
        message: "路由加载失败",
        type: "error",
      })
      router.push("/login")
    }
  })
</script>

<style scoped lang="less"></style>
