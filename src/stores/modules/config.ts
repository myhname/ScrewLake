import {reactive} from "vue"
import store from "../index"
import {defineStore} from 'pinia'
import {GlobalParamsInterface, OptionsDataInterface, ThemeInterface} from "@/types/config"

export const useConfigStore = defineStore("configStore", () => {
    const systemState = reactive<GlobalParamsInterface>({
        isWindowMax: false, // 窗口最大化
        currTitleText: "", // 标题
        promptingMsg: "", // 行为提示
        isNetworked: false, // 是否有网络
        isConnectSever: false, // 是否连接上后端
        leftBtnIdList: ["setting", "userCenter", "backHome"], // 左侧菜单栏上方动态按钮显示
        isWindowFixed: false, // 是否固定桌面
        systemConfig: {
            dailyRecordDataPath: "",
            imageResourcePath: "",
            optionsDataPath: "",
            cartoonResourcePath: "",
        }, // 系统文件配置
    })

    // 动态选项
    const optionsData = reactive<OptionsDataInterface>({
        imageTypeOptions: [],
        cartoonTagsOptions: [],
        cartoonAuthorOptions: [],
    })

    const themeState = reactive<ThemeInterface>({
        type: "default",
    })

    return {
        systemState,
        optionsData,
        themeState
    }
})

// 在 setup 外使用
export const UseConfigStoreHook = () => {
    return useConfigStore(store)
}