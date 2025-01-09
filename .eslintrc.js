module.exports = {
    // 指定 ESLint 的根目录，防止其查找父级目录的配置文件
    root: true,

    // 环境设置，定义全局变量，比如 `browser` 和 `node`
    env: {
        browser: true, // 启用浏览器环境中的全局变量，例如 `window`
        node: true,    // 启用 Node.js 环境中的全局变量，例如 `global`
    },

    // 指定解析器，用于解析 Vue 和 TypeScript 文件的语法
    parser: 'vue-eslint-parser', // 专为 Vue 文件设计的解析器
    parserOptions: {
        parser: '@typescript-eslint/parser', // 使用 TypeScript 的解析器
        // ecmaVersion: 2020,                  // 支持 ECMAScript 2020 语法
        ecmaVersion: 'latest', //（注释掉的行）启用最新 ECMAScript 版本
        sourceType: 'module',               // 使用 ES 模块
    },
    plugins: [ // 自定义使用的 ESLint 插件
        'vue', // Vue.js 插件
        '@typescript-eslint' // TypeScript 插件
    ],

    // 配置扩展规则集合
    extends: [
        'plugin:vue/vue3-essential',       // Vue 3 的基础 ESLint 规则
        'plugin:@typescript-eslint/recommended', // TypeScript 推荐的 ESLint 规则
        'prettier',                        // 禁用与 Prettier 冲突的 ESLint 规则
    ],

    // 自定义 ESLint 规则
    rules: {
        // 允许组件名为单个单词（默认要求组件名为多单词）
        'vue/multi-word-component-names': 0,
        // 允许使用 `any` 类型（默认会报错）
        '@typescript-eslint/no-explicit-any': 0,
        // 报告未使用的变量，但忽略以下划线开头的变量（如 `_unused`）
        '@typescript-eslint/no-unused-vars': ['error', {argsIgnorePattern: '^_'}],
        'import/no-unresolved': 'off', // 关闭未解析的模块导入错误
        'import/extensions': 'off', // 关闭文件扩展名校验
        'import/no-absolute-path': 'off', // 允许绝对路径导入
        'import/no-extraneous-dependencies': 'off', // 关闭额外依赖校验
        'vue/no-multiple-template-root': 'off', // 允许 Vue 组件中多个根节点
        'no-console': 'off', // 允许使用 `console`（如 `console.log`）
        'init-declarations': 'off', // 允许变量声明后不立即初始化
        'no-inline-comments': 'off', // 允许行内注释
        'no-param-reassign': [ // 禁止对函数参数进行重新赋值
            'error',
            {
                props: true, // 禁止更改函数参数的属性
                ignorePropertyModificationsFor: ['state', 'config']
                // 允许修改 `state` 和 `config` 属性（例如 Vuex 中常见的 `state` 处理）
            }
        ]
    },
    settings: {} // 其他设置（当前为空）
};
