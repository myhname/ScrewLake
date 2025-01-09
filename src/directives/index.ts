import {App} from "vue";
import {permission} from "./permission"

export const loadDirectives = (app: App<Element>) => {
    app.directive("permission", permission)
}