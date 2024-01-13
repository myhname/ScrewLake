/// <reference types="vite/client" />

declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component:DefineComponent<{},{},any>
  export default component

}

interface ImportMetaEnv {
  readonly VITE_BASE_API: string
}