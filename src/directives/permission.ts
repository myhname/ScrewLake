// TODO: 后续改好 stores 之后补全这里的逻辑
import {type Directive} from "vue";

const authorList = ["aa", "bb"]

export const permission: Directive = {
    mounted: (el, binding) => {
        const {value: permission} = binding
        const hasPermission = authorList.some((auth) => {
            return permission.includes(auth)
        })
        hasPermission || el.parentNode?.removeChild(el)
    }
}
// eg: v-permission = "['aa']"