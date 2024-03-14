<template>
  <!-- note: 一方面我不是很会用组件，另一方面想要花哨一点改起来确实不方便，综上：自己写原生 -->
  <div class="blog-title-menu">
    <template v-for="item in state.menuList" :key="item.path">
      <div v-if="!item.children || !item.children.length" class="menu-item" :class="{ 'menu-selected': state.selectedKeys[0] === item.path, 'menu-font-white': props.menuWhite }" @click="menuClick(item)">
        <MyIcons :icon="item.icon" :style="myIconsFont" />
        <span class="menu-title"> {{ item.meta.title }} </span>
      </div>
      <!-- tag: 先不考虑多级和嵌套那些，以目前的情况来说封装一级就够了，之后在拓展原生吧，连悬浮窗都写就有点太麻烦了 -->
      <div v-else class="menu-groups" :class="{ 'menu-selected': state.selectedKeys[0] === item.path, 'menu-font-white': props.menuWhite }">
        <MyIcons :icon="item.icon" :style="myIconsFont" />
        <span class="menu-title"> {{ item.meta.title }} </span>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, watch, onMounted, defineProps } from "vue"
  import { useRouter } from "vue-router"
  import emitter from "@/utils/eventBus"
  import MyIcons from "@/components/MyIcons.vue"

  const props = defineProps({
    menuWhite: {
      type: Boolean,
      default: false
    }
  })
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

  // 数组是因为要给子级菜单预留
  const state: {
    // openKeys: Array<string>
    selectedKeys: Array<string>
    // collapsed: boolean
    // defaultSelectedKeys: Array<string>
    menuList: Array<MenuList>
  } = reactive({
    // openKeys: ["/"],
    selectedKeys: ["/"],
    // collapsed: false,
    // defaultSelectedKeys: ["/"],
    menuList: [
      {
        key: 1,
        name: "cover",
        path: "/cover",
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
  const myIconsFont = ref("font-size: 1.3rem")

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

  const menuClick = (selectedMenu: MenuList) => {
    console.log(selectedMenu)
    state.selectedKeys = []
    state.selectedKeys.push(selectedMenu.path)
    if (selectedMenu.children && selectedMenu.children.length) {
      selectedMenu.children.forEach((item) => {
        addSelectedMenu(item)
      })
    }
    router.push(selectedMenu.path)
  }

  const addSelectedMenu = (menu: MenuList) => {
    state.selectedKeys.push(menu.path)
    if (menu.children && menu.children.length) {
      menu.children.forEach((item) => {
        addSelectedMenu(item)
      })
    }
  }

  onMounted(() => {
    // 先不考虑很复杂的菜单定位问题
    state.selectedKeys = []
    state.selectedKeys.push(router.currentRoute.value.path)
  })
</script>

<style lang="less" scoped>
  @highlightColor: #3da4db;

  .blog-title-menu {
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 12px;

    .menu-item,
    .menu-groups {
      display: flex;
      flex-direction: row;
      align-items: center;
      column-gap: 3px;
      color: #000;

      .menu-title {
        font-size: 18px;
      }

      &:hover {
        color: @highlightColor;
      }
    }

    .menu-item.menu-font-white,
    .menu-groups.menu-font-white {
      color: #eeeeee;
    }

    .menu-item.menu-selected,
    .menu-groups.menu-selected {
      color: @highlightColor;
    }

  }
</style>
