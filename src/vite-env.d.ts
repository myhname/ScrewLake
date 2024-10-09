/// <reference types="vite/client" />

declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component:DefineComponent<{},{},any> & {
    install(app: App): void
  }
  export default component

}

interface ImportMetaEnv {
  readonly VITE_BASE_API: string
  readonly VITE_BASE_IMG_PATH: string
  readonly VITE_START_RUN_TIME: string
}