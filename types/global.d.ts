// 声明全局ts类型

// label value 二元组
interface LabelValue {
    label: string | Array<string>
    value: number | string | Array<string | number>
    icon?: string
    valueUnit?: string
    color?: string
    backgroundColor?: string
    msg?: string
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

// 列表数据泛型 data这种可变性太大了，不如用的时候解析限定必要的参数
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