# 前端 SDK 的封装及使用

- SDK 即 “软件开发工具包”，简单来说就是一组封装好的函数，供开发者调用。前端 SDK 的封装及使用，可以简化前端开发流程，提高开发效率。
- 我们可以将一些常用的工具函数、API 请求封装成 SDK，以供不同项目调用。

## 一、开发 SDK

首先准备好需要的工具函数和 API 请求，例如：

```vue
<template>
  <div class="test-sdk-container">测试一下sdk： {{ props.title }}</div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from "vue"
  import { ElMessage } from "element-plus"

  const props = defineProps({
    title: {
      type: String,
      default: "",
    },
  })

  const testSDK = ref("这是测试sdk")

  onMounted(() => {
    ElMessage.warning(testSDK.value)
    console.log("输出测试sdk日志：", testSDK.value)
  })
</script>

<style scoped lang="less">
  .test-sdk-container {
    width: 500px;
    height: 100px;
    background-color: red;
  }
</style>
```

### 1. 导出组件

新建一个 ts 文件，例如：`test-sdk.ts`，将组件导出：

```ts
export { default as testSDK } from "./testSDK.vue"
```

### 2. 封装 SDK

在 vite.config.ts 中配置打包选项，生成 SDK 文件：

```ts
build: {
  lib: {
    entry: "src/sdk/test-sdk.ts", // SDK的入口文件
    name: "MyTestSdk",
    fileName: (format) => `my-vue-sdk.${format}.js`,
  },
  ···
}
```

执行打包命令，生成资源文件

## 二、使用 SDK

我们可以直接使用打包产物进行安装，也可以将打包好的 SDK 文件上传到 npm 或者私有仓库，然后在项目中安装 SDK。

### 1. 使用打包产物引入 SDK

1. 手动复制资源文件到项目 node_modules 目录下，例如：`node_modules/my-vue-sdk/`
2. 编写 package.json 文件，例如：`node_modules/my-vue-sdk/package.json`

```json
{
  "name": "my-vue-sdk",
  "version": "1.0.0",
  "description": "A simple Vue 3 SDK with a modal component",
  "main": "dist/my-vue-sdk.umd.js",
  "module": "dist/my-vue-sdk.es.js",
  "files": [
    "dist"
  ],
  "peerDependencies": {
    "vue": "^3.0.0"
  },
  "author": "Your Name",
  "license": "MIT"
}
```

3. 在项目中引入 SDK："my-vue-sdk": "file:./node_modules/my-vue-sdk"
4. 在项目中使用 SDK：

```vue
<template>
  <my-vue-sdk-modal :title="'这是标题'"></my-vue-sdk-modal>
</template>

<script setup lang="ts">
  import { testSDK as MyVueSdkModal } from 'my-sdk-test';
  import "my-sdk-test/dist/style.css"
</script>
```

### 2. 上传到 npm 并引入依赖

1. 注册 npm 账号，这一步自行去 npm 官网完成即可
2. 发布 SDK 到 npm：确保 SDK 项目根目录下包含打包生成的所有必要文件（如dist目录等），然后在命令行执行

```bash
npm publish
```

发布过程中可能会遇到版本冲突等问题，如果提示版本已存在，需在package.json中更新version字段，遵循语义化版本规则，如从1.0.0更新为1.0.1等

3. 在项目中引入 npm 依赖。

```bash
npm install my-vue-sdk
```
