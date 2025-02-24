// 系统文件路径配置
interface SystemConfigInterface {
    dailyRecordDataPath: string
    imageResourcePath: string
    optionsDataPath: string
    cartoonResourcePath: string
}

// 动态选项
export interface OptionsDataInterface {
    imageTypeOptions: Array<LabelValue>
    cartoonTagsOptions: Array<LabelValue>
    cartoonAuthorOptions: Array<LabelValue>
}

// 系统配置
export interface GlobalParamsInterface {
    homeRouter: string // 首页路径
    avatar: string // 头像路径
}

export enum ThemeTypeEnum {
    DEFAULT = "default",
    DARK = "dark",
}

// 主题
export interface ThemeInterface {
    type: ThemeTypeEnum
}