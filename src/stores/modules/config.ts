import {reactive} from "vue"
import store from "../index"
import {defineStore} from 'pinia'
import {GlobalParamsInterface, OptionsDataInterface, ThemeInterface, ThemeTypeEnum} from "@/types/config"

export const useConfigStore = defineStore("configStore", () => {
    const systemState = reactive<GlobalParamsInterface>({
        homeRouter: import.meta.env.BASE_URL,
        avatar: import.meta.env.BASE_URL + "src/assets/img/avatar.jpg"
    })

    // 动态选项
    const optionsData = reactive<OptionsDataInterface>({
        imageTypeOptions: [],
        cartoonTagsOptions: [],
        cartoonAuthorOptions: [],
    })

    const themeState = reactive<ThemeInterface>({
        type: ThemeTypeEnum.DEFAULT,
    })

    return {
        systemState,
        optionsData,
        themeState,
    }
})

// 在 setup 外使用
export const UseConfigStoreHook = () => {
    return useConfigStore(store)
}