# 使用githubPages部署静态页面及自动化

## 一、整体流程概览

整个自动化部署流程可以拆分为以下几个阶段：

```text
本地编写博客
   ↓
Git 提交并推送到 GitHub
   ↓
GitHub Actions 触发 CI
   ↓
构建静态文件（build）
   ↓
部署到 GitHub Pages
   ↓
访问 https://username.github.io
```

## 二、准备工作

### 1、仓库规划

GitHub Pages 支持两种常见模式：

| 模式 | 说明 | 适合场景 |
| -------------------- | --------------------------- | ---- |
| **User / Org Pages** | 仓库名必须是 `username.github.io`，唯一存在 | 单一博客 |
| **Project Pages** | 普通仓库，通过分支或目录发布，每个项目有一个，访问时地址会多一截，形如：`username.github.io/repositoriesName` | 多项目 |

推荐方案（主流）：

```text
blog-repo/
├─ src / docs / content   # 博客源文件
├─ public / dist          # 构建产物
└─ .github/workflows      # CI 配置
```

但是实际上不用管这个，只需要有：静态页面文件（打包产物） + 工作流配置 （github/workflows）即可

### 2、本地环境

以常见静态博客工具为例：

1. Hexo
2. VuePress
3. VitePress
4. Hugo
5. 自定义 Vite / Webpack

只要满足一个条件即可：

> 最终能生成纯静态文件（HTML / CSS / JS）

## 三、GitHub Pages 配置

选择发布源（Source）：

- GitHub Actions
- Deploy from a branch

下图以第二种方式为例：

![发布配置](/ScrewLake/notes/img/githubPages.png)

## 四、项目配置

### 1、创建 Workflow 工作流

路径：

```bash
.github/workflows/deploy.yml
```

### 2、构建示例

```yml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - static-re-develop  # 监听 static-re-develop 分支

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20

      - name: Install dependencies
        run: npm install

      - name: Build project
        run: npm run build-only  # 你的打包命令，需确保 `package.json` 中有对应的 `build` 脚本

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist  # 你的打包文件目录，确保与实际构建路径一致
          branch: gh-pages  # 部署到 gh-pages 分支，此分支仅存放构建产物（自动生成）
```

## 五、构建目录与路径问题（常见坑）

### 1、base / publicPath 配置

如果不是 username.github.io 仓库，而是项目仓库：

```text
https://username.github.io/project-name/
```

必须设置 基础路径：

```ts
// Vite 示例
export default defineConfig({
  base: '/project-name/'
})
```

否则会出现：

- 页面空白
- CSS / JS 404

### 2、SPA 刷新 404 问题

GitHub Pages 不支持服务端路由。

解决方案：

- 使用 hash 路由
- 生成 404.html 并重定向到 index.html

以第二种方案为示例，在  index.html 页面中加入一下内容：

```html
<script type="text/javascript">
    (function () {
        const urlParams = new URLSearchParams(window.location.search);
        const redirectPath = urlParams.get('redirect');
        const basePath = '/ScrewLake'; // 请确保与 vite.config.ts 的 base 配置一致

        if (redirectPath) {
            // 检查 redirectPath 是否已经包含 basePath，避免重复拼接
            const targetPath = redirectPath.startsWith(basePath) ? redirectPath : `${basePath}${redirectPath}`;

            // 使用 History API 重写 URL，交给 Vue Router 处理
            history.replaceState(null, '', targetPath);
        }
    })();
</script>
```

并在 public 文件夹下生成 404.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Not Found</title>
    <script>
        (function () {
            const basePath = '/ScrewLake'; // 请确保与 vite.config.ts 的 base 配置一致
            const currentPath = window.location.pathname;
            const search = window.location.search;

            // 如果路径已经以 basePath 开头，避免重复重定向
            if (currentPath.startsWith(basePath + '/index.html')) {
                console.error('Redirect loop detected. Aborting...');
                return;
            }

            // 将用户重定向到 index.html，同时保留原始路径和查询参数
            let targetUrl = ""
            if (search) {
                targetUrl = `${basePath}/index.html?redirect=${encodeURIComponent(currentPath + search)}`
            } else {
                targetUrl = `${basePath}/index.html?redirect=${encodeURIComponent(currentPath)}`
            }
            window.location.replace(targetUrl);

        })();
    </script>
</head>

<body>
<h1>Redirecting...</h1>
</body>

</html>
```
