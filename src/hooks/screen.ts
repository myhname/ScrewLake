import {onMounted, onUnmounted} from 'vue';
import {UseConfigStoreHook} from "@/stores/modules/config"

const configStore = UseConfigStoreHook()

/**
 * 监听屏幕大小变化的 Hook
 */
export function watchWindowSize() {
    // 更新屏幕大小时的回调（可以在这里自定义行为）
    const handleResize = () => {
        console.log("页面变化：", window.outerHeight, screen.availHeight)
        configStore.systemState.isWindowMax = (window.outerHeight === screen.availHeight && window.outerWidth === screen.availWidth)
        configStore.systemState.promptingMsg = "屏幕最" + configStore.systemState.isWindowMax ? "大" : "小" + "化"
    };

    console.log('调用监听屏幕大小变化');

    onMounted(() => {
        window.addEventListener('resize', handleResize);
        console.log('开始监听屏幕大小变化');
    });

    onUnmounted(() => {
        window.removeEventListener('resize', handleResize);
        console.log('停止监听屏幕大小变化');
    });
}
