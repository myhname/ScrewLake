# 全局css样式替换之PostCSS

由于笔者个人喜好，在开发项目中有这样一个需求：希望能够让鼠标样式变为自己喜欢的图标，效果如下：

![樱花飘落]("/ScrewLake/notes/img/鼠标效果.png")

如果是我们自己写的的元素，那么引入一些全局声明的 css 类就可以较为简单的改变鼠标样式了，例如：

```css
:root {
    --cursor_normal: url("../assets/cursor/ani/Normal.ani"), url("../assets/cursor/cur/cursorNormal.cur"), auto;
    --cursor-point: url("../assets/cursor/ani/Link.ani"), url("../assets/cursor/cur/cursorLink.cur"), pointer;
    --cursor_text: url("../assets/cursor/ani/Text.ani"), url("../assets/cursor/cur/cursorText.cur"), text;
    --cursor_no_drop: url("../assets/cursor/ani/Unavailable.ani"), url("../assets/cursor/cur/cursorNo.cur"), no-drop;
    --cursor_all_scroll: url("../assets/cursor/ani/Move.ani"), url("../assets/cursor/cur/cursorMove.cur"), all-scroll;
}

/* 鼠标样式 */
.cursor-normal {
    cursor: var(--cursor_normal);
}

.cursor-pointer {
    cursor: var(--cursor-point);
}

.cursor-all-scroll {
    cursor: var(--cursor_all_scroll);
}
```

但是如果在项目中使用 element-plus 等组件库，那么再想改变默认的鼠标样式就很麻烦了。

因此我们可以使用 PostCSS 来对 css 代码进行预处理，其作用可以简单立即为：在 CSS 样式执行前，进行字符串替换，使得最终浏览器处理的是转化之后的 CSS 代码。

## 一、PostCSS

PostCSS 是一个基于 JavaScript 的 CSS 处理工具，其核心功能是通过插件系统解析、转换和优化 CSS 代码。它并非传统意义上的 CSS 预处理器（如 Sass/Less），而是一个高度模块化的 CSS 处理平台。工作原理如下：

1. 解析（Parse）：将 CSS 字符串转换为结构化 AST
2. 插件执行（Run Plugins）：插件遍历 AST 修改节点（如添加前缀、优化规则）
3. 生成（Generate）：将处理后的 AST 转回 CSS 字符串

## 二、配置方法

### 1. 安装依赖

```bash
npm install postcss postcss-loader postcss-preset-env --save-dev
```

### 2. 创建 postcss.config.js

在 vite.config.ts 同目录下创建文件 postcss.config.js，配置示例如下：

```js
// postcss.config.js
module.exports = {
    plugins: [
        require('postcss-preset-env')({
            browsers: 'last 2 versions',
        }),
        // 自定义插件：替换 cursor: pointer
        {
            postcssPlugin: 'cursor-replace',
            Declaration(decl) {
                if (decl.prop === 'cursor') {
                    switch (decl.value) {
                        case 'pointer':
                            decl.value = "url('./cursor/ani/Link.ani'), url('./cursor/cur/cursorLink.cur'), pointer";
                            break;
                        case 'text':
                            decl.value = "url('./cursor/ani/Text.ani'), url('./cursor/cur/cursorText.cur'), text";
                            break;
                        case 'no-drop':
                            decl.value = "url('./cursor/ani/Unavailable.ani'), url('./cursor/cur/cursorNo.cur'), no-drop";
                            break;
                        case 'all-scroll':
                            decl.value = "url('./cursor/ani/Move.ani'), url('./cursor/cur/cursorMove.cur'), all-scroll";
                            break;
                        case 'default':
                            decl.value = "url('./cursor/ani/Normal.ani'), url('./cursor/cur/cursorNormal.cur'), default";
                            break
                    }

                }
            },
        },
    ],
}
```

如上效果是对浏览器默认的鼠标图标进行替换，这样就可以实现文初示例图的效果了。

## 三、注意事项

1. 更改 postcss.config.js 中的配置之后，需要重启项目才能生效。个人理解：vite 对运行时模块代码进行热更新，但是 postcss.config.js 的机制类似于 Babel 对 JavaScript 的处理，属于构建工具层的静态配置，而非运行时模块。
2. 静态资源打包：PostCSS 默认不处理资源路径，需通过 postcss-url 插件显式配置资源处理逻辑，这样才能够正确打包，示例配置如下：

```ts
// vite.config.js
import postcssUrl from 'postcss-url';

export default {
  css: {
    postcss: {
      plugins: [
        postcssUrl({
          url: 'rebase', // 重定位路径
          from: 'src/styles', // CSS 文件基准路径
          to: 'dist/assets' // 目标输出目录
        }),
        require('postcss-pointer')
      ]
    }
  },
  // 补充资源处理逻辑
  build: {
    assetsDir: 'assets', // 统一资源输出目录
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash].[ext]' // 控制文件名格式
      }
    }
  }
};
```
