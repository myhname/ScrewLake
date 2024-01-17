// import store from "@/store";
import router from "./index"
import { npStart, npClose } from '@/utils/nprogress' // 加载进度条
// import watermark from "../utils/watermark.js";
// done: 暂时还没写后端，所以从本地json读数据
import menuListData from "@/data/menuList.json"

//路由守卫
//白名单
// done: 一期不要登录，其实白名单也不必，但是需要动态注册路由，所以token和路由注册放一起，这样即使没目录页可以跳转会首页注册目录，所以白名单加入首页和首页重定向
const whiteList = ["/login", "/notFound", "/"]
// let isSetRouter = false;
router.beforeEach((to, from, next) => {
  // note: 这里使用NProgress的主要目的是起到刷新路由配置的作用，因为动态注册进去的路由不能直接使用，原因应该是当前路由表指向的问题，新的路由表已经注册，但是跳转访问的仍是旧的路由表
  npStart()
  if (from.path === "/login" || from.path === "/"  || from.path === "/notes") {
    localStorage.setItem("menuList", JSON.stringify(menuListData))
    console.log("从登录界面跳转，注册动态路由", localStorage.getItem("menuList"))
    if (menuList != localStorage.getItem("menuList")) {
      menuList = localStorage.getItem("menuList")
      if (menuList) {
        bindRoute(JSON.parse(menuList)) // 动态绑定路由
      }
    }
  }
  const token = localStorage.getItem("token")
  // if (token && !isSetRouter) {
  //     const menu = localStorage.getItem("menuList");
  //     if (menu) {
  //         bindRoute(JSON.parse(menu)); // 动态绑定路由
  //         isSetRouter = true;
  //     } else {
  //         console.log("没有载入动态路由");
  //     }
  //     return next(to.path);
  // }
  /**
   * 1.判断token
   * 2.判断菜单权限
   */
  if (token) {
    next()
  } else {
    if (whiteList.includes(to.path)) {
      next() // 放行
    } else {
      // next("/login") // 跳转登录页面
      next("/")
    }
  }
})

//绑定动态路由
const bindRoute = (menuList: any) => {
  const newRoutes = router.options.routes
  // console.log("打印当前路由：", newRoutes)
  menuList.forEach((menu: any) => {
    if (menu.children && menu.children.length) {
      menu.children.forEach((m: any) => {
        // 菜单转成路由
        let route = menuToRoute(m, menu.name)
        // console.log("当前路由：", route)
        if (route) {
          // console.log("路由时什么样子的", newRoutes)
          newRoutes[menu.id - 1].children?.push(route) // 添加到路由管理
        }
      })
    } else {
      let route = menuToRoute(menu, "")
      // console.log("当前路由：", route)
      // TODO：这里是做什么用的我其实没太理解
      // if (route) {
      //     newRoutes[1].children?.push(route); // 添加到路由管理
      // }
    }
  })
  // 重新添加到路由
  newRoutes.forEach((route) => {
    router.addRoute(route)
  })
  // console.log("这是最终结果：", newRoutes)
  localStorage.setItem("token", "getToken")
}
// 菜单转成路由
const modules = import.meta.glob("../views/**/*.vue")
const menuToRoute = (menu: any, parentName: string) => {
  if (!menu.component) {
    return null
  } else {
    let route = {
      name: menu.name,
      path: menu.path,
      meta: {
        title: menu.meta.title,
        parentName: parentName,
      },
      component: modules[`../views/${menu.component}.vue`],
    }
    // console.log("这是相对路径", `../views/${menu.component}.vue`, modules)
    // console.log("route", route)
    return route
  }
}

let menuList: string | null = localStorage.getItem("menuList")
console.log("执行注册")
// 如果已经存储过的话，直接执行
if (menuList) {
  bindRoute(JSON.parse(menuList)) // 动态绑定路由
}

router.afterEach((to, from) => {
  console.log("路由跳转：", from, to)
  npClose()
  // watermark.init({
  //   watermark_txt: JSON.parse(localStorage.getItem("currentUser"))
  //     ? JSON.parse(localStorage.getItem("currentUser")).username
  //     : " ",
  //   //   watermark_img: '../assets/img/default.jpg', //报错
  //   watermark_img: new URL("../assets/img/水印.png", import.meta.url).href, //压根不执行
  //   watermark_color: "#808080", //水印字体颜色
  //   watermark_fontsize: "24px", //水印字体大小
  //   watermark_alpha: 0.2, //水印透明度，要求设置在大于等于0.005
  //   watermark_angle: 20, //水印倾斜度数
  //   watermark_width: 200, //水印宽度
  //   watermark_height: 100, //水印长度
  // });
  // console.log("水印执行了吗");
})
