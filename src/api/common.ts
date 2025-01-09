import {postAction} from "@/utils/request/request.ts"
import {TableDataResponse} from "@/types/user.ts"

/**
 * 获取 table 数据
 * @param url 请求接口路径
 * @param params 入参 泛型P，根据实际情况实现
 */
export const getTableData = <P, T>(url: string, params: P) => postAction<TableDataResponse<T>>(url, params)