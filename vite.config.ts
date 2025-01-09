import {UserConfigExport, ConfigEnv} from 'vite';
import vue from '@vitejs/plugin-vue';
// import cleanPlugin from 'vite-plugin-clean'; // 默认导入（正确）
import compression from 'vite-plugin-compression';
// Mock相关功能（需安装依赖）：vite-plugins-mock
// import { viteMockServe } from 'vite-plugins-mock';
import { resolve } from 'path'

export default ({command, mode}: ConfigEnv): UserConfigExport => {
    // 获取当前日期时间作为时间戳
    const timestamp = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14);
    const isProduction = mode === 'production';

    return {
        plugins: [
            // cleanPlugin(), // 在每次构建时清理输出目录
            vue(),
            compression({
                ext: '.gz', // 生成 .gz 文件
                threshold: 10240, // 仅压缩大于 10KB 的文件
            }), // 使用 Gzip 压缩打包后的静态资源以提升加载性能
            // Mock服务配置（根据需要启用）
            // viteMockServe({
            //     mockPath: "./src/mock/test", // 指定Mock文件路径
            //     enable: command === 'serve', // 仅在开发环境启用
            //     logger: false, // 是否在控制台显示请求日志
            //     watchFiles: false, // 是否监听文件变化
            // })
        ],
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src') // 设置 `@` 指向 `src` 目录
            },
        },
        base: isProduction ? '/prod-base/' : '/', // 公共基础路径, 根据环境调整（生产环境用来区分路径）
        // 在代码中可以直接通过 __API_BASE_URL__ 使用这个变量，而不需要每次通过 import.meta.env.VITE_API_BASE_URL 获取
        // define: {
        //     __API_BASE_URL__: JSON.stringify(process.env.VITE_API_BASE_URL), // 替代 VITE_ 环境变量
        // },
        publicDir: 'public', // 静态资源文件夹，默认是 public
        optimizeDeps: {
            include: ['echarts', 'axios', 'mockjs'], // 强制预构建的依赖
        },
        build: {
            // target: 'modules, // 设置最终构建的浏览器兼容目标，modules: 支持原生 ES 模块的浏览器
            // 构建输出路径
            outDir: 'dist',
            // 静态资源存放路径
            assetsDir: 'assets',
            // 小于此阈值的资源自动内联为 Base64
            assetsInlineLimit: 4096,
            // 禁用 CSS 代码拆分，将所有 CSS 合并为一个文件
            cssCodeSplit: false,
            // 是否生成 source map 文件（生产环境通常关闭以提升性能）
            sourcemap: false,

            // Rollup 打包配置
            rollupOptions: {
                output: {
                    // 配置输出文件名，增加时间戳避免缓存问题
                    chunkFileNames: `assets/js/[name]-[hash]-${timestamp}.js`,
                    entryFileNames: `assets/js/[name]-[hash]-${timestamp}.js`,
                    assetFileNames: `assets/[ext]/[name]-[hash]-${timestamp}.[ext]`, // 资源文件分类存放，增强目录结构的清晰性。
                },
            },

            // 开启 Terser 进行压缩，并移除 console 和 debugger（可选）
            minify: 'terser',
            terserOptions: {
                compress: {
                    drop_console: false, // 移除 console
                    drop_debugger: false, // 移除 debugger
                },
                format: {
                    comments: false, // 移除注释
                }
            },
        },
        esbuild: {
            drop: [], // 默认不移除任何语句（可配置为移除 console 或 debugger）
        },
        envPrefix: 'VITE_', // 配置环境变量前缀
        preview: {
            port: 8088, // 预览服务端口
            open: true, // 启动后自动打开浏览器
        },
        server: {
            hmr: {
                overlay: true, // 错误覆盖显示
                timeout: 3000, // HMR 超时重新连接时间
            }, // 在开发环境下，优化模块热替换（HMR）的速度和兼容性
            host: '0.0.0.0', // 允许局域网访问
            port: 9099, // 开发服务器端口
            open: false, // 是否自动打开浏览器
            proxy: {
                '/api': {
                    target: 'http://localhost:8080/', // 后端服务地址
                    changeOrigin: true, // 是否修改请求头中的 Origin
                    rewrite: path => path.replace(/^\/api/, 'blog'), // 重写路径
                },
            },
        },
    };
};
