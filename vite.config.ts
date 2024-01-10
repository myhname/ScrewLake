import { fileURLToPath, URL } from 'node:url'

// import { defineConfig } from 'vite'
import { UserConfigExport, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// Mock相关，还需要按照依赖，本项目没配置
// import { viteMockServe } from 'vite-plugins-mock'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],
// })

export default ({ command }: ConfigEnv): UserConfigExport => {
    return {
        plugins: [
            vue(),
            // viteMockServe({
            //     mockPath: "./src/mock/test", //解析，路径可根据实际变动
            //     // enable: false, //开发环境关闭
            //     enable: command === 'serve', //开发环境启用 serve build
            //     logger: false, // 是否在控制台显示请求日志
            //     wathcFiles: false,
            // })
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            }
        },
        base: '/', // 生产服务时的基本公用路径
        publicDir: 'public', // 静态资源服务的文件夹，默认“public”
        // 引入第三方配置，强制预构建插件包
        optimizeDeps: {
            include: ['echarts', 'axios', 'mockjs'],
        },
        // 构建
        build: {
            // target: 'modules, // 设置最终构建的浏览器兼容目标，modules: 支持原生 ES 模块的浏览器
            outDir: 'dist', // 指定打包输出路径
            assetsDir: 'assets', // 指定静态资源存放路径
            assetsInlineLimit: 4096, // 小于此阙值的导入或引用资源将内联为base64编码，设置为0即可禁用此项，默认4096（4kb）
            cssCodeSplit: false, // css代码拆分，禁用则所有样式保留在一个css里面
            sourcemap: false, // 是否构建 source map 文件

            // 会打包出 css js 等文件夹，目录结构更清晰
            rollupOptions: {
                output: {
                    chunkFileNames: 'assets/js/[name]-[hash].js',
                    entryFileNames: 'assets/js/[name]-[hash].js',
                    assetFileNames: 'assets/js/[name]-[hash].[ext]'
                }
            },

            
            // minify: 'terser', // 必须启用：terserOptions配置才会有效
            // // 生产环境取消 console
            // terserOptions: {
            //     compress: {
            //         drop_console: true,
            //         drop_debugger: true
            //     }
            // }
        },
        esbuild: {
          drop: ["console", "debugger"],
        },
        envPrefix: 'VITE_', // 'APP_',
        preview: {
            port: 8080,
            open: true,
        },
        // 本地服务
        server: {
            host: '0.0.0.0', // ip
            port: 9099, // 端口号
            open: true, // 是否自动在浏览器中打开
            https: false, // 是否开启 https
            proxy: {
                'api': {
                    target: ' 127.0.0.1:9099',
                    changeOrigin: true,
                    // rewrite: path => path.replace(/^\/api/, 'data-sense')
                }
            }
        }
    }
}
