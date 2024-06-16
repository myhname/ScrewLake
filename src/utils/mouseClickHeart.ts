// 鼠标点击特效，爱心

let mouseEffectArr = [] as MouseEffect[]

const screenWidth: number = window.screen.width
const screenHeight: number = window.screen.height

// 随机颜色
function getRandomColor(): string {
  let color = "rgba("
  for (let i = 0; i < 3; i++) {
    let random = Math.floor(Math.random() * 256)
    color += random + ","
  }
  // 透明度要变，所以这里不补全
  // color += "1)"
  return color
}

class MouseEffect {
  // 位置
  x: number = 0
  y: number = 0
  // 速度
  v: number = 0
  // 大小
  d: number = 0
  // 颜色
  color: string = ""
  // 透明度
  opacity: number = 1

  // 初始化
  init(x: number, y: number): void {
    this.x = x
    this.y = y
    this.v = 5
    this.d = 10
    this.color = getRandomColor()
    this.opacity = 1
  }

  // 渲染
  render(cxt: CanvasRenderingContext2D): void {
    cxt.save()
    heart(cxt, this.x, this.y, this.color + this.opacity + ")")
    cxt.restore()
  }

  // 更新，模拟移动
  updated(): void {
    this.v ? (this.y -= this.v) : (this.y -= 2)
    this.opacity -= 0.1
    if (this.opacity <= 0) {
      this.remove()
    }
  }

  // 移除
  remove(): void {
    for (let i = 0; i < mouseEffectArr.length; i++) {
      if (mouseEffectArr[i] === this) {
        mouseEffectArr.splice(i, 1)
      }
    }
  }
}

// 每次都重新画会不会损性能？

// 绘制爱心
function heart(ctx: CanvasRenderingContext2D, x: number, y: number, color: string) {
  //设置初始弧度
  let radian = 0
  //设置弧度增量，每次增加1°
  let radian_add = Math.PI / 180
  //开始绘图
  ctx.beginPath()
  // 重新映射画布上的 (0,0) 位置
  ctx.translate(x, y)
  // 设置绘制起点
  ctx.moveTo(getX(radian), getY(radian))
  // 弧度小于等于360°
  while (radian <= Math.PI * 2) {
    //每增加一次弧度，绘制一条线
    radian += radian_add
    let X = getX(radian)
    let Y = getY(radian)
    ctx.lineTo(X, Y)
  }
  // ctx.strokeStyle = "red"
  // ctx.stroke()
  ctx.fillStyle = color
  ctx.fill()
}

//获取心型线的X坐标，放大15倍
function getX(t: number) {
  return 0.5 * (12 * Math.sin(t) - 4 * Math.sin(3 * t))
}

//获取心型线的Y坐标，放大15倍
function getY(t: number) {
  return -0.5 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))
}

let timer: any = null
let mycanvas: HTMLCanvasElement | null = null

// 创建画布
export function createHeartCanvas() {
  mycanvas = document.createElement("canvas")
  mycanvas.width = screenWidth
  mycanvas.height = screenHeight
  mycanvas.setAttribute("style", "position: absolute;left: 0;top: 0;pointer-events: none;z-index: 999;")
  mycanvas.setAttribute("id", "canvas_mouseEffect")
  document.getElementsByTagName("body")[0].appendChild(mycanvas)
}

// 销毁画布
export function stopMouseEffect() {
  if (mycanvas) document.getElementsByTagName("body")[0].removeChild(mycanvas)
  mycanvas = null
}

// 点击触发，调用的时候需要监听鼠标点击事件，传入坐标
export function mouseClick(clientX: number, clientY: number) {
  console.log("鼠标点击", clientX, clientY)
  if (!mycanvas) {
    createHeartCanvas()
  }
  if (mycanvas) {
    console.log("触发点击事件", clientX, clientY)

    let cxt = mycanvas.getContext("2d")

    let currMouseClick = new MouseEffect()
    currMouseClick.init(clientX, clientY)
    mouseEffectArr.push(currMouseClick)

    if (!timer) {
      // 定时器更新
      timer = setInterval(() => {
        // console.log("还有: ",sakuraArr.length)
        if (cxt !== null) {
          cxt.clearRect(0, 0, screenWidth, screenHeight)
          for (let i = 0; i < mouseEffectArr.length; i++) {
            mouseEffectArr[i].updated()
            // 有可能已经被移除
            if (mouseEffectArr[i]) {
              mouseEffectArr[i].render(cxt)
            }
          }
        }
        if (!mouseEffectArr.length) {
          if (timer) {
            // 清除定时器
            clearInterval(timer)
            timer = null
          }
          return
        }
      }, 1000 / 10) // 10帧
    }
  }
}
