// directives/tooltip.js
export default {
    mounted(el, binding) {
        const tooltip = document.createElement('div')
        tooltip.className = 'native-tooltip'
        tooltip.textContent = binding.value
        document.body.appendChild(tooltip)

        el.addEventListener('mouseenter', () => {
            tooltip.style.display = 'block'
            const rect = el.getBoundingClientRect()
            tooltip.style.left = `${rect.left + rect.width / 2}px`
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 8}px` // 调整位置
        })

        el.addEventListener('mouseleave', () => {
            tooltip.style.display = 'none'
        })
    },
    unmounted() {
        document.querySelector('.tooltip')?.remove()
    }
}
