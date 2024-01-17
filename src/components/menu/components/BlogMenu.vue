<template>
  <!-- <a-menu :inlineIndent="inlineIndent" 菜单缩进 :defaultSelectedKeys="[$route.path]" 默认选中的节点 :openKeys="openKeys" 展开的节点 mode="inline" 菜单模式 :inline-collapsed="collapsed" 折叠方式 @openChange="onOpenChange" @click="menuClick"> </a-menu> -->
  <a-menu class="blog-title-menu" v-model:openKeys="state.openKeys" v-model:selectedKeys="state.selectedKeys" :defaultSelectedKeys="['/login']" mode="horizontal " theme="light" :inline-collapsed="state.collapsed" @openChange="onOpenChange" @click="menuClick" @select="selectMeun">
    <!-- 菜单遍历的开始 -->
    <template v-for="item in state.menuList">
      <!-- 如果当前遍历项没有children，视为子菜单项，注意所有的key都是path用于路由跳转，以及当前选中记录 -->
      <a-menu-item v-if="!item.children || !item.children.length" :key="item.path">
        <!-- <i :class="item.menu_icon" style="font-size: 18px; margin-right: 5px" /> -->
        <template #icon>
          <MyIcons :icon="item.icon" :style="myIconsFont" />
        </template>
        <span class="menu-title">{{ item.meta.title }} </span>
      </a-menu-item>
      <!-- 否则视为子菜单，传入菜单信息并且运用下面定义的函数式组件 -->
      <a-sub-menu v-else :key="item.name">
        <template #icon>
          <MyIcons :icon="item.icon" :style="myIconsFont" />
        </template>
        <template #title>
          <span class="menu-title">{{ item.meta.title }} </span>
        </template>
        <a-menu-item v-for="subMenu in item.children" :key="subMenu.path">
          <span class="menu-title">{{ subMenu.meta.title }} </span>
        </a-menu-item>
      </a-sub-menu>
    </template>
  </a-menu>

  
</template>

<script setup lang="ts">
  import { ref, reactive, watch, onMounted } from "vue"
  import { useRouter } from "vue-router"
  import emitter from "@/utils/eventBus"
  import MyIcons from "@/components/MyIcons.vue"

  const router = useRouter()

  interface MenuList {
    key: number
    name: string
    path: string
    component?: string
    children?: MenuList[]
    meta: MenuMeta
    icon: string
  }

  interface MenuMeta {
    title: string
  }

  const state: {
    openKeys: Array<string>
    selectedKeys: Array<string>
    collapsed: boolean
    defaultSelectedKeys: Array<string>
    menuList: Array<MenuList>
  } = reactive({
    openKeys: ["/login"],
    selectedKeys: ["/login"],
    collapsed: false,
    defaultSelectedKeys: ["/login"],
    menuList: [
      {
        key: 1,
        name: "index",
        path: "/",
        meta: {
          title: "首页",
        },
        icon: "icon_home",
      },
      {
        key: 1,
        name: "notes",
        path: "/notes",
        meta: {
          title: "笔记",
        },
        icon: "a-bijibenbiji1",
      },
      // {
      //   key: 1,
      //   name: 'index',
      //   path: '/',
      //   meta: {
      //     title: "日志"
      //   },
      //   icon: ""
      // },
      // {
      //   key: 1,
      //   name: 'index',
      //   path: '/',
      //   meta: {
      //     title: "关于"
      //   },
      //   icon: "icon_home"
      // },
    ],
  })

  // 字体大小在父级设置不生效
  const myIconsFont = ref("font-size: 1.5rem")

  watch(
    () => router.currentRoute.value.path,
    (newValue: string, oldValue: string | undefined) => {
      state.selectedKeys[0] = newValue
      // console.log(newValue,oldValue,typeof oldValue, (oldValue != undefined))
      // done: 退出登录方法还没写，先这么着判断
      if (newValue === "/login" && oldValue != undefined) {
        emitter.emit("is-login-out")
      }
    },
    { immediate: true }
  )

  const onOpenChange = () => {
    // value
    // console.log("菜单展开时的回调：",value)
  }

  const menuClick = (selectedMenu: { key: string; keyPath: string[] }) => {
    console.log(selectedMenu)
    state.openKeys[0] = selectedMenu.key
    if (selectedMenu.keyPath.length > 1) {
      state.selectedKeys[0] = selectedMenu.keyPath[0]
    }
    router.push(selectedMenu.key)
  }

  const selectMeun = () => {
    // value
    // console.log("选择时，没发现有什么区别：",value)
  }

  onMounted(() => {
    state.selectedKeys[0] = router.currentRoute.value.path
  })
</script>

<style scoped lang="less">
  @selectedColor: #1677ff;

  .menu-title {
    font-size: 1rem;
  }
  .svg-icon {
    fill: #fff;

    &:hover {
      fill: @selectedColor;
    }
  }

  .blog-title-menu {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: transparent;

    :deep(.ant-menu-item) {
      display: flex;
      flex-direction: row;
      align-items: center;
      color: #fff;

      &::after {
        border-bottom: 0px;
      }
    }

    :deep(.ant-menu-item):hover,
    :deep(.ant-menu-item-selected),
    :deep(.ant-menu-item-active) {
      color: @selectedColor!important;

      &::after {
        border-bottom: 0px;
      }

      .svg-icon {
        fill: @selectedColor;
      }
    }

  }
</style>
