# animate.css使用笔记

基础好用的动画效果组件库

官网：<https://animate.style/>

## 下载依赖

```js
npm install animate.css --save

or

yarn add animate.css
```

## 注册

```js
// 全局引入（vue3）
import 'animate.css'
// vue2我没有实际使用过，按照网上的教程是需要挂载一下的
```

## 使用

这里我踩了很大一个坑：使用动画类名之前，必须加上：animate__animated

```js
// 使用
<transition name="fade" enter-active-class="animate__animated animate__headShake" leave-active-class="animate__animated animate__zoomOutDown">
  <div v-if="show" class="animate__animated animate__headShake">hello world</div>
</transition>
```

包裹在transition中是为了便于控制动画效果触发的时机，直接写在元素上也可以

```css
/* 控制时间等，也可以使用animate.css封装好的控制类 */
.animate__animated.animate__headShake {
  --animate-duration: 10s;
}
```
