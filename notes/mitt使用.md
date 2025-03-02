# mitt使用

vue3中没有了框架自带的全局通信机制，所以想要任意组件间通信的话，需要自行实现类似事件总线的功能

## 下载依赖

```npm
npm install mitt

or

yarn add mitt
```

## 注册

个人习惯的用法是封装成工具类，在需要使用的组件中引入

```js
import mitt from "mitt"
//总线，无关系的组件间传值
export default mitt()
```

## 使用示例

```js
// 引入
import emitter from '@/untils/eventBus'

// 触发事件
emitter.emit('eventName', eventValue)

// 监听事件，需要在特定生命周期中挂载，同名事件只能在一个组件中监听，否则会有Bug
onMounted(() => {
    //接收页面改变信息
    emitter.on('eventName', (value) => {
        ...
    })
})

// 注销事件，减少资源占用
onBeforeUnmount(() => {
    //注销监听事件
    emitter.off('eventName')
})
```
