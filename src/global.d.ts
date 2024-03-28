// 声明全局ts类型

// 请求返回值，result的具体类型就没必要了，几乎每个都不一样，登录接口是这种形式，而且后端还参杂了两种返回格式
interface ResReturn {
    code: number
    // message?: string
    // result?: any
    // success?: boolean
    // timestamp?: number
    msg: string
    data: any
}

// 大屏筛选条件：车型
interface CarMsg {
    modelSeries: string
    evShortMileage: null | string | number
    evLongMileage: null | string | number
    evSuperLongMileage: null | string | number
    modelPicture: string
}

// label value 二元组
interface LabelValue {
    label: string | Array<string>
    value: number | string | Array<string | number>
    icon?: string
    valueUnit?: string
}

// 大屏数据筛选条件
interface SelectCondition {
    selectedDateStr: string
    selectedCarType: CarMsg | string | null //得看后端要什么样
    selectedArea: { name: string; provinceName: string } | string
}

interface TreeType {
    [key: string]: any

    // id?: number
    // label?: string,
    children?: TreeType[]
}

// 树形数据泛型
interface TreeData {
    treeData: any
    checkedKeys?: Array<number>
    defineProps: {
        children: string
        label: string
        showCheckbox: boolean
    }
    nodeKey?: string
    selectedKey?: Array<number>
}

// 列表数据泛型
// data这种可变性太大了，不如用的时候解析限定必要的参数
interface TableData {
    data: Array<T> | undefined
    total?: number | undefined
    page?: {
        currentPage: number
        pageSize: number
    }
    searchValue?: string
    srcList?: Array<string>
}

// 标签泛型数据
interface LabelData {
    label: string
    value?: number | string
    icon?: string
    color?: string
    backgroundColor?: string
}

interface NoteList {
    id: number
    title: string
    coverImg: string
    description: string
    createTime: string
    updateTime: string
    tags: Array<LabelData>
    isOmit?: boolean
    flexDirection?: string
    statistics: Array<LabelData>
}