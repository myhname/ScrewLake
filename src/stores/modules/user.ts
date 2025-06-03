import {ref} from "vue"
import {defineStore} from 'pinia'
import store from "../index"
import {UserInfoInterface} from "@/types/user"

export const useUserStore = defineStore("userStore", () => {
    const userInfo = ref<UserInfoInterface>({
        name: "ScrewLake",
        signature: "虽生如草芥，也愿随风而起，追云逐日，俯瞰山海"
    })

    return {
        userInfo,
    }
})

// 在 setup 外使用
export const UseUserStoreHook = () => {
    return useUserStore(store)
}