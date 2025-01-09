import { reactive, onMounted } from "vue"
import { getTableData } from "@/api/common.ts"
import { ElMessage } from "element-plus"

interface TableOpts {
    getDataListUrl: string // 数据请求路径
    searchParams: Object // 查询参数
    dataHandleFunc?: Function // 数据结果处理函数
    initPage?: {
        pageSize: number
        currentPage: number
    } // 初始分页参数
    testResult?: Array<any> // 开发时候模拟的数据
    searchParamFunc?: Function // 处理入参，格式化 searchParams
}

export default function (opts: TableOpts) {
    const tableState = reactive({
        listCount: 0, // 总条数
        page: {
            pageSize: 1,
            currentPage: 10,
        }, // 当前分页数据
        tableData: [] as Array<any>, // 结果数据
        loadingTable: false, // 加载中状态标识
    })

    /**
     * 请求数据
     */
    const getTableList = () => {
        let params = {} as Object
        if(opts.searchParamFunc) {
            params = {
                ...opts.searchParamFunc()
            }
        } else {
            params = {
                ...opts.searchParams,
                page: {
                    current: tableState.page.currentPage,
                    size: tableState.page.pageSize
                }
            }
            tableState.loadingTable = true
            if(!opts.testResult && opts.getDataListUrl) {
                getTableData(opts.getDataListUrl, params).then(res => {
                    tableState.tableData = []
                    tableState.listCount = 0
                    if(res.status === 200) {
                        if(res.data && res.data.records && res.data.records.length) {
                            tableState.listCount = res.data.total
                            tableState.tableData = res.data.records
                            if(opts.dataHandleFunc) {
                                opts.dataHandleFunc()
                            }
                        } else {
                            ElMessage.warning("暂无数据")
                        }
                    } else {
                        ElMessage.warning((res.msg))
                    }
                }).catch((err: any)=>{
                    console.error(err)
                }).finally(()=>{
                    tableState.loadingTable = false
                })
            } else {
                if(opts.testResult) {
                    tableState.tableData = opts.testResult
                    tableState.listCount = opts.testResult.length
                    if(opts.dataHandleFunc) {
                        opts.dataHandleFunc()
                    }
                } else {
                    console.error(("getDataListUrl为空的情况下，请传入 testResult 作为数据结果"))
                }
                tableState.loadingTable = false
            }
        }
    }

    const resetPage = () => {
        tableState.page.pageSize = opts.initPage?.pageSize ?? 10
        tableState.page.currentPage = opts.initPage?.currentPage ?? 1
    }

    onMounted(()=>{
        resetPage()
    })

    return {
        tableState,
        getTableList,
        resetPage
    }
}
