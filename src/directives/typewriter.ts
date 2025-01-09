export default {
    install(Vue: any, options: any) {
        options = options || {}

        /**
         * 格式化绑定到dom上的数据
         * @param {*} binding
         */
        function formatBinding(binding: any) {
            let trackData: any = ""
            let eventMode = "click"
            if (typeof binding.value === "object") {
                if ("event" in binding.value) {
                    eventMode = binding.value.event
                }
                if ("data" in binding.value) {
                    trackData = binding.value.data
                } else {
                    trackData = binding.value
                }
            } else {
                trackData = binding.value
            }
            return {
                eventMode,
                trackData,
            }
        }

        // 初始化
        if ("init" in options && options.init instanceof Function) {
            try {
                options.init()
            } catch (error) {
                if (options.debug) {
                    console.log(error)
                }
            }
        }

        Vue.directive("typewriter", {
            mounted(el: any, binding: any) {
                const format = formatBinding(binding)
                el.trackData = format.trackData
                let str = el.innerHTML
                el.innerHTML = ""
                console.log("打字机效果", el, binding, format, str)

                let index = 0

                let timer = setInterval(() => {
                    if (index < str.length) {
                        el.innerHTML += str.charAt(index)
                        index++
                    } else {
                        clearInterval(timer)
                    }
                    console.log("打字机", el.innerHTML)
                }, format.trackData.delay)
            },
        })
    },
}