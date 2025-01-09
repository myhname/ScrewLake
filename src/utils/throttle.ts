const throttle = (func: Function, delay: number) => {
  // 缓存一个定时器
  let timer: any = null
  return function (...args: any) {
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(this, arguments)
        timer = null
      }, delay)
    }
  }
}

export default throttle

// 示例
/*
const attentionChange = debounce((data) => {
	console.log("触发")
	focusDemand('ownerFocus/focusDemand', { demandId: data.id }).then((res) => {
		let { code, msg } = res
		if (code === 200) {
			data.focusFlag = !data.focusFlag
			ElMessage({
				type: 'success',
				message: msg
			})
		} else {
			ElMessage({
				type: 'error',
				message: msg
			})
		}
	})
}, 200)
*/
