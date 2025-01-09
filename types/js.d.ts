// 在 ts 项目中兼容 js 文件，提供一个类型为 any 的默认导出
declare module "*.js" {
    const value: any
    export default value
}