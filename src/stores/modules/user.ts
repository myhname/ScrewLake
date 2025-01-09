import {ref} from "vue"
import {defineStore} from 'pinia'
import store from "../index"
import {UserInfoType} from "@/types/user"

export const useUserStore = defineStore("userStore", () => {
    const userInfo = ref<UserInfoType>({
        name: "ScrewLake",
    })

    return {
        userInfo,
    }
})

// 在 setup 外使用
export const UseUserStoreHook = () => {
    return useUserStore(store)
}