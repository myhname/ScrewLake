# Screw-Lake-Blog

## 一、项目说明

- 个人博客，练习技术顺便记录一下学习、生活
- 纯静态前端页面，本分支迭代不涉及后端交互，需要手动进行笔记、日志更新
  - 不想花钱租服务器，没有办法提供稳定的后端服务，所以先重构一版纯前端的，挂载到 GitHub 上
- 项目模块：
  - 个人中心：这里是看到一个网站效果很有意思，所以大体上仿照实现了一下，顺便练习一下 gsap 中滚动条动画的使用，[点击查看](https://duo-studio.co/?spm=5176.28103460.0.0.48a85d27GXYY5O)
  - 笔记：博客的核心功能，顺带充当首页
  - 随笔：笔记模块主要记录技术方面的学习内容，随笔记录一下个人的生活、兴趣爱好
    - 照片墙，这部分内容不会很多，存储及服务器限制（使用github仓库做的图床被封了，不租服务器没地方存，简单来说感觉必要性不大，展示一些喜欢的照片即可）
    - 收藏夹，这部分展示一些个人觉得很好的网站、番剧等等
    - 随笔：日常记录
  - 塔防游戏demo：一时兴起，这部分慢慢完善吧，主要是素材不好获取，而且打工人总归是缺乏时间和精力
  - 系统管理：笔记、日志等记录是读的项目静态资源（json文件），因此更新内容的时候需要手动更新文件，没有后端或者客户端（electron）实在没办法做到可视化界面操作然后自动更新，但是好歹有个填写界面以避免手写json，计划使用 浏览器指纹 或者 ip地址 作为白名单来控制路由显示（没有后端的迁就手段）

## 二、运行说明

- 本地（开发）环境执行

```bash
# 拉取依赖
npm install 

# 运行vue页面
npm run dev
```

- 构建测试环境包

```bash
# vue页面
npm run build:test 
```

- 构建生产环境包

```bash
npm run build:pro
# 如果不熟悉 ts 语法，项目中存在不符合 ts 静态语法检测的部分，可以考虑使用 npm run build-only 跳过语法检测
```

## 三、使用 GitHub Pages 部署及自动化

这部分单独写了一篇笔记，[点此查看](https://myhname.github.io/ScrewLake/notes)

## 项目开发笔记

那些年之我踩过的坑

### 1、静态页面路由跳转问题

**问题描述**：使用 GitHub Pages 搭载静态页面，直接访问项目根路径 可以正确加载首页，但是路由路径变化之后，再刷新页面无法重定向到页面资源，报错 404

**原因**：在使用 vue-router 的 history 模式（如 createWebHistory）时，静态页面托管服务（GitHub Pages）会尝试直接请求路径对应的文件，而不是交由 vue-router 管理。这会导致刷新页面时找不到资源报 404 错误

**解决方案**：GitHub Pages 支持自定义的 404.html 页面，我们可以利用这一特性，将其变成前端路由的重定向文件。具体操作如下：

1. 在项目 public 路径下，创建 404.html 文件(public 是静态资源目录，其中的文件会原封不动地复制到最终的打包目录 dist 中，方便 GitHub Pages 读取)

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

2. 在 index.html 中加入以下中解析 redirect 参数的脚本，使得 vue-router 能够正常处理重定向路径。

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
