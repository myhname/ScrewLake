// 系统文件路径配置
interface SystemConfigType {
    dailyRecordDataPath: string
    imageResourcePath: string
    optionsDataPath: string
    cartoonResourcePath: string
}

// 动态选项
export interface OptionsDataType {
    imageTypeOptions: Array<LabelValue>
    cartoonTagsOptions: Array<LabelValue>
    cartoonAuthorOptions: Array<LabelValue>
}

// 系统配置
export interface GlobalParamsType {
    isWindowMax: boolean // 窗口是否最大化
    currTitleText: string // 标题
    promptingMsg: string // 行为提示
    isNetworked: boolean // 是否有网络
    isConnectSever: boolean // 是否连接上后端
    leftBtnIdList: Array<string> // 左侧菜单栏上方动态按钮显示
    isWindowFixed: boolean // 是否固定桌面
    systemConfig: SystemConfigType // 系统文件配置
}

export enum ThemeTypeEnum {
    DEFAULT = "default",
    DARK = "dark",
}

// 主题
export interface ThemeType {
    type: ThemeTypeEnum
}