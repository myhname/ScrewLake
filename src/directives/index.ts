import {App} from "vue";
import {permission} from "./permission"
import tooltipDirective from './tooltip'
import VTypewriter from "./typewriter"

export const loadDirectives = (app: App<Element>) => {
    app.directive("permission", permission)
    app.directive('tooltip', tooltipDirective)
    app.use(VTypewriter, {
        type: "effect",
        debug: false
    })
}