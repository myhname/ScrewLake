export const computeRunTime = (fromTime: number) => {
    let now = (new Date()).getTime()
    let time = Math.floor((now - fromTime) / 1000)// 总秒数
    let days = Math.floor(time / (24 * 60 * 60)) // 天数
    time = time % (24 * 60 * 60)
    let hours = Math.floor(time / (60 * 60))
    time = time % (60 * 60)
    let minutes = Math.floor(time / 60)
    let seconds = Math.floor(time % 60)
    return days + "天" + hours + "时" + minutes + "分" + seconds + "秒"
}