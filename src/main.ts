import {createApp} from 'vue'

/// 全局css样式
import './styles/generic.css'
import 'animate.css'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

// 引入路由
import router from "./router";
// 引入身份认证，路由权限，水印
// import './router/permission'

// 引入 pinia
import store from "./stores"

// 引入UI组件
import {loadElementPlus} from "@/plugins/elementPlus"

// 引入指令
// import VTypewriter from "@/directives/typewriter"
import {loadDirectives} from "./directives"

import App from './App.vue'

const app = createApp(App)
app.use(router)
app.use(store)
loadDirectives(app)
loadElementPlus(app)

// app.use(VTypewriter, {
//   type: "effect",
//   debug: false
// })

router.isReady().then(() => {
    app.mount('#app')
})

