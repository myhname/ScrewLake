import {watch} from 'vue';
import {useConfigStore} from '@/stores/modules/config'; // 确保路径正确
import {ThemeTypeEnum} from "@/types/config"

export function useTheme() {
    const configStore = useConfigStore();

    // 定义一个更新主题类名的方法
    const updateThemeClass = (theme: ThemeTypeEnum) => {
        const rootElement = document.documentElement;

        // 移除所有可能的主题类名
        Object.values(ThemeTypeEnum).forEach((themeClass) => {
            rootElement.classList.remove(themeClass as string);
        });

        // 根据 themeState.type 添加新的类名
        if (theme != ThemeTypeEnum.DEFAULT) {
            rootElement.classList.add(`theme-${theme}`);
        }

        console.log("主题：", rootElement, theme)
    };

    // 监听 themeState.type 的变化
    watch(
        () => configStore.themeState.type,
        (newTheme) => {
            updateThemeClass(newTheme);
        },
        {immediate: true} // 初始化时立即调用
    );

    return {
        updateThemeClass, // 如果需要手动更新时，可以使用
    };
}
