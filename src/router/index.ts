import { createRouter, createWebHistory } from "vue-router"

// tag: 静态路由：首页（带一个重定向的展示介绍界面），登录（封面和登录一个路由），个人中心，组件库，笔记库
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "index",
      path: "/",
      component: () => import("@/views/Index.vue"),
      meta: {
        title: "首页",
      },
      redirect: "/login",
      children: [],
    },
    {
      name: "login",
      path: "/login",
      component: () => import("@/views/login/Login.vue"),
      meta: {
        title: "登录",
      },
    },
    {
      name: "modules",
      path: "/modules",
      component: () => import("@/views/modules/ModulesIndex.vue"),
      meta: {
        title: "组件库",
      },
      children: [],
    },
    {
      name: "notes",
      path: "/notes",
      component: () => import("@/views/note/NotesIndex.vue"),
      meta: {
        title: "笔记",
      },
      children: [],
    },
  ],
})

export default router
/*
动态路由格式数据说明：
第一级路由统一父级id为0，这些相互独立，不会有统一的样式基础，且权限一致，配置在静态路由中
子路由parentId为父级路由在静态路由中的次序编号，从1开始（区别于0）
到二级路由就可以了，三级算按钮，不具体区分各个页面之前的操作权限
menuList中存储包括静态和动态路由，已经菜单信息，能够用于动态生成菜单（感觉菜单那里通过router.getRoutes()这个方法试一下，看能拿到什么样的数据）
*/
