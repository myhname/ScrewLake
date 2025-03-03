# gsap学习及使用

## 1. gsap简介

- GreenSock Animation Platform (GSAP)是一个功能十分强大的动画平台，可以帮助我们实现大部分的动画需求，构建高性能的、适用于所有主要浏览器的高性能动画
- GSAP非常的灵活，可以在任何框架上处理页面能够所有通过js改变的元素，不仅可以对div的css属性进行动画，还是SVG、React、Vue、WebGL，甚至和Threejs一起使用

## 2. gsap安装及引入

```bash
# npm 
npm install gsap

# cdn
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.7/dist/gsap.min.js"></script>

# yarn
yarn add gsap
```

## 3. gsap 基础使用

### 3.1 gsap.to()

gsap.to()方法用于创建一个动画，从当前状态到指定的目标状态

```js
gsap.to(".box-1", { duration: 2, x: 200, rotation: 360, ease: "power1.inOut" })
```

使用 gsap 进行的动画，执行完成之后默认不会回到初始状态，如果需要回到初始状态，可以使用 gsap.fromTo() 方法（会在下一次执行的时候回归初始状态），或者在 onComplete 回调函数中手动设置初始状态。

### 3.2 gsap.from()

gsap.from()方法用于创建一个动画，从指定的目标状态到当前状态

```js
gsap.from(".box-2", { duration: 2, x: 200, rotation: 360, ease: "power1.inOut" })
```

### 3.3 gsap.fromTo()

gsap.fromTo()方法用于创建一个动画，从指定的起始状态到指定的目标状态

```js
gsap.fromTo(".box-3", { x: 0, rotation: 0 }, { duration: 2, x: 200, rotation: 360, ease: "power1.inOut" })
```

### 3.4 gsap.set()

gsap.set()方法用于设置元素的初始状态，不会产生动画效果

```js
gsap.set(".box-4", { x: 200, rotation: 360 })
```

### 3.5 特殊属性

| 属性名     | 描述                                                                      |
| ---------- | ------------------------------------------------------------------------- |
| duration   | 动画持续时间，单位为秒，默认 0.5 秒                                       |
| delay      | 动画延迟时间，单位为秒，默认 0 秒                                         |
| ease       | 缓动函数，控制动画的速率变化，默认为 "power1.out"                         |
| onStart    | 动画开始时的回调函数                                                      |
| onUpdate   | 动画更新时的回调函数                                                      |
| onComplete | 动画完成时的回调函数                                                      |
| repeat     | 动画重复次数，默认为 0，-1 表示无限循环                                   |
| yoyo       | 尔值，如果为 true，每次其他动画就会往相反方向运动（像 yoyo 球）默认 false |
| stagger    | 动画延迟间隔时间，单位为秒，默认为 0 秒，可以用于多个元素的动画效果       |

## 4. gsap 动画控制

### 4.1 时间线

时间线可以让我们将多个动画按照顺序排列，形成一个复杂的动画序列

```js
let tl = gsap.timeline()

t1.to(".green", {
  x: 600,
  duration: 2,
})
t1.to(".purple", {
  x: 600,
  duration: 1,
})
t1.to(".orange", {
  x: 600,
  duration: 1,
})
```

- 在将动画添加到时间线上的时候，默认情况下，动画会按照添加的顺序依次播放，但是我们也可以通过一些参数来控制动画的播放顺序和播放时机

```js
const t1 = gsap.timeline()
t1.to(".red", { x: 400, duration: 1 })
// 在1秒开始插入动画（绝对值）
t1.to(".green", { x: 400, duration: 1 }, 1)
// 在上个动画的开始插入动画
t1.to(".purple", { x: 400, duration: 1 }, "<")
// 在最后一个动画结束后一秒插入动画
t1.to(".orange", { x: 400, duration: 1 }, "+=1")
```

- 同时，我们还可以使用标签来标记时间点，方便后续控制

```js
let tl = gsap.timeline()
tl.addLabel("start")
tl.to(".green", {
  x: 600,
  duration: 2,
  onStart: () => console.log("start"),
  onComplete: () => console.log("green complete"),
  onUpdate: () => console.log("green update"),
  repeat: -1,
  yoyo: true,
  stagger: 0.5,
  ease: "power1.inOut",
})
tl.addLabel("middle")
tl.to(".purple", {
  x: 600,
  duration: 1,
  onStart: () => console.log("middle"),
  onComplete: () => console.log("purple complete"),
  onUpdate: () => console.log("purple update"),
}, "myLabel+=1")
```

### 4.2 动画控制方法

| 方法名          | 描述                     |
| --------------- | ------------------------ |
| play()          | 播放时间线               |
| pause()         | 暂停时间线               |
| reverse()       | 反转时间线               |
| seek()          | 跳转到指定的时间点       |
| restart()       | 重新开始时间线           |
| progress()      | 设置时间线进度           |
| timeScale()     | 设置时间线速度           |
| totalDuration() | 设置时间线总时长         |
| add()           | 添加动画到时间线         |
| addLabel()      | 添加标签到时间线         |
| addPause()      | 添加暂停点到时间线       |
| from()          | 从指定状态开始动画       |
| fromTo()        | 从指定状态到指定状态动画 |
| set()           | 设置元素状态             |
| to()            | 到指定状态动画           |
| call()          | 调用回调函数             |

### 4.3 注册动画

对于高度重复的动画，我们可以使用 gsap.registerEffect() 方法来注册一个动画函数，这样就可以在后续的动画中直接调用

```js
gsap.registerEffect({
  name: "move",
  effect: (targets: string | HTMLElement, config: any) => {
    return gsap.to(targets, {
      duration: config.duration,
      y: config.y,
      x: config.x,
      rotate: config.rotate,
      scaleX: -1,
      onComplete: () => {
        console.log("移动完成", JSON.stringify(config))
      },
    })
  },
  defaults: { x: 0, y: 0, duration: 1, rotate: 360 },
  extendTimeline: true, // 启用对时间线的支持
})

tl.move(".box-5", { x: 200, y: 200, duration: 2 })
```

## 5. gsap 插件之 ScrollTrigger

ScrollTrigger 是一个非常强大的插件，可以让我们根据滚动条的位置来触发动画，或者让动画随着滚动条的位置而变化

### 1. 注册插件

```js
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)
```

### 2. 基本使用

使用 scrollTrigger 来进行动画控制，既可以在 gsap.to()、gsap.from()、gsap.fromTo() 等方法中使用，也可以在时间线中使用

```js
gsap.to(".box2", {
  scrollTrigger: {
    trigger: ".green",
    scrub: true,
  }, //当出现这个dom的时候, .box2 会向x移动500px, 类似于一个触发器
  x: 500,
})

tl = gsap.timeline({
  scrollTrigger: {
    scroller: "#personalCenterDom", // 指定哪个元素的滚动会触发此动画
    scrub: true, // 平滑过渡
    // markers: true, // 显示标记线
    trigger: ".personalized-detail-container",
    start: "top top", // 定义动画开始的条件
    end: "bottom bottom", // 定义动画结束的条件
  },
})
```

同时也可以使用 toggleClass 添加类名，借助类名的变化在滚动时控制样式

```js
gsap.to(".box2", {
  scrollTrigger: {
    trigger: ".green",
    scrub: true,
    toggleClass: {targets: ".my-selector", className: "active"}
  }, //当出现这个dom的时候, .box2 会向x移动500px, 类似于一个触发器
  x: 500,
})
```

## 6. gsap 插件之 Draggable

### 1. 注册

```js
gsap.registerPlugin(Draggable)
Draggable.create("#yourID")
```

### 2. 使用

```js
Draggable.create(".flair--1", {
  type: "x", // 拖拽类型，可以是 x、y、x,y、rotation 等
  bounds: ".container", // 拖拽边界，可以是父元素的选择器或者一个对象，表示具体的边界范围
})

Draggable.create(".flair--3b", {
  type: "rotation",
  inertia: true, // 惯性效果，拖拽结束后会继续移动一段时间
})

Draggable.create(".flair--4b", {
  bounds: ".container",
  inertia: true,
})
```

## 7. demo演示

[gsap示例](/ScrewLake/modules?key=gsapExample)