// 跟随鼠标移动洒落星星

const screenWidth: number = window.screen.width
const screenHeight: number = window.screen.height

const starColor = ["#ffff00", "#66fff", "#3399ff", "#99ff00", "#ff9900"]
let timeoutList: Array<number> = []

let starList: Array<Star> = []

let mycanvas: HTMLCanvasElement | null = null

class Star {
  // 初始坐标、角度
  x: number = 0
  y: number = 0
  rot: number = Math.random() * 90 + 90
  // 星星里面小圆半径
  r: number = Math.random() * 0.5 + 1.5
  // 运动数据
  td: number = Math.random() * 4 - 2 // 旋转
  dx: number = Math.random() * 2 - 1
  dy: number = Math.random() * 1 + 1

  // 颜色
  color: string = starColor[Math.floor(Math.random() * starColor.length)]
  // 透明度
  opacity: number = 1

  // 初始化构造方法
  init(clientX: number, clientY: number): void {
    this.x = clientX
    this.y = clientY
  }

  // 渲染
  render(ctx: CanvasRenderingContext2D): void {
    ctx.save()
    createStar(ctx, this)
    ctx.restore()
  }

  // 更新，模拟移动
  updated(): void {
    this.x += this.dx
    this.y += this.dy
    this.rot += this.td
    this.r -= 0.015
    if (this.r < 0) {
      this.remove()
    }
  }

  // 移除
  remove(): void {
    for (let i = 0; i < starList.length; i++) {
      if (starList[i] === this) {
        starList.splice(i, 1)
      }
    }
  }
}

// 创建星星
function createStar(ctx: CanvasRenderingContext2D, star: Star): void {
  ctx.beginPath()
  for (let i = 0; i < 5; i++) {
    //先绘制小圆上一个点
    ctx.lineTo(Math.cos(((18 + i * 72 - star.rot) * Math.PI) / 180) * star.r + star.x, -Math.sin(((18 + i * 72 - star.rot) * Math.PI) / 180) * star.r + star.y)
    //连线到大圆上一个点
    ctx.lineTo(Math.cos(((54 + i * 72 - star.rot) * Math.PI) / 180) * star.r * 3 + star.x, -Math.sin(((54 + i * 72 - star.rot) * Math.PI) / 180) * star.r * 3 + star.y)
  }
  ctx.closePath()
  ctx.fillStyle = star.color
  ctx.strokeStyle = star.color
  ctx.lineWidth = 0.1
  ctx.lineJoin = "round"
  ctx.fill()
  ctx.stroke()
}

// 创建画布
export function createStarCanvas() {
  mycanvas = document.createElement("canvas")
  // 这样设置只能在最一开始自适应窗口大小，无法响应式
  mycanvas.width = screenWidth
  mycanvas.height = screenHeight
  mycanvas.setAttribute("style", "position: absolute;left: 0;top: 0;pointer-events: none;z-index: 99;")
  mycanvas.setAttribute("id", "canvas_mouseMoveStar")
  document.getElementsByTagName("body")[0].appendChild(mycanvas)
  // 挂载事件监听
  window.addEventListener("mousemove", mouseMoveFunction)
}

// 销毁画布
export function stopMouseMoveStar() {
  if (mycanvas) document.getElementsByTagName("body")[0].removeChild(mycanvas)
  mycanvas = null
  // 卸载事件监听
  window.removeEventListener("mousemove", mouseMoveFunction)
}

// 鼠标移动触发的事件方法
const mouseMoveFunction = (e: MouseEvent) => {
  let currStar = new Star()
  currStar.init(e.clientX, e.clientY)
  starList.push(currStar)

  if (!mycanvas) {
    window.removeEventListener("mousemove", mouseMoveFunction)
    createStarCanvas()
    return
  }

  let ctx = mycanvas.getContext("2d")

  for (let index = 0; index < 200; index++) {
    // 清除计时器，防止内存移除
    if (index === 0 && timeoutList.length > 0) {
      for (let timeoutName of timeoutList) {
        clearTimeout(timeoutName)
      }
    }
    // 使用setTimeout，用完就清除，防止长时间不动时候仍有计时器所带来的性能消耗以及内存占用，一定程度上避免网页卡顿
    timeoutList[index] = setTimeout(() => {
      if (ctx != null) {
        ctx.clearRect(0, 0, screenWidth, screenHeight)
        for (let star of starList) {
          // 先渲染再更新，一定是还有的
          star.render(ctx)
          star.updated()
        }
      }
    }, index * 20)
  }
}
