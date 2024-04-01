import { createApp } from 'vue'

// 全局css样式
import './assets/css/normalize.css'
import './assets/css/generic.css'

// 引入element-plus组件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons-vue'

// 引入ant-design-vue
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

import 'animate.css'

// 引入路由
import router from "./router";
// 引入身份认证，路由权限，水印
import './router/permission'

import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus)
app.use(Antd)
app.use(router)

app.mount('#app')

// 全局注册
Object.keys(Icons).forEach(key => {
    app.component(key, Icons[key as keyof typeof Icons])
})
