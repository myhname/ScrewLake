import gsap from "gsap"

let mycanvas: HTMLElement | null = null
let tl = gsap.timeline({paused: true})	// 创建一个时间轴实例，方便后续动画控制和管理

const mouseMoveFunction = (e: MouseEvent) => {
    if (!mycanvas) {
        window.removeEventListener("mousemove", mouseMoveFunction)
        createStarCanvas(document.getElementsByTagName("body")[0])
        return
    }
    // console.log("鼠标移动：", e.clientX, e.clientY)
    tl.clear()	// 清除时间轴上的s所有动画，避免动画堆积导致性能问题
    tl.to(mycanvas, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,	// 动画持续时间，单位秒
    })
    tl.play()	// 播放时间轴上的动画
}

// 创建画布
export function createStarCanvas(dom: HTMLElement) {
    mycanvas = document.createElement("div")
    mycanvas.setAttribute("class", "mouse-followed")	// 设置类名，方便后续样式覆盖和修改
    // 这样设置只能在最一开始自适应窗口大小，无法响应式
    mycanvas.setAttribute("style", "transform: translate(-50%, -50%)")
    // mycanvas.setAttribute("id", "canvas_mouseMoveStar")
    dom.appendChild(mycanvas)
    // 挂载事件监听
    window.addEventListener("mousemove", mouseMoveFunction)
}

// 销毁画布
export function stopMouseMoveStar(dom: HTMLElement) {
    console.log("销毁画布", mycanvas)	// 打印日志，方便调试和确认函数执行情况
    if (mycanvas) {
        try {
            dom.removeChild(mycanvas)
        } catch (error) {
            console.error(error)	// 捕获并打印错误信息，避免程序崩溃
            document.getElementsByTagName("body")[0].removeChild(mycanvas)
        }
    }
    mycanvas = null
    // 卸载事件监听
    window.removeEventListener("mousemove", mouseMoveFunction)
}