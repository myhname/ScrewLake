import { postAction, deleteAction } from "@/utils/request/request.ts"

/**
 * 新增 or 编辑 日志
 * @param url logs/newLog or logs/updateLog
 * @param params
 */
export const editLogs = (url: string, params: any) => postAction(url, params)

/**
 * 删除日志
 * @param url logs/changeLogsStatus
 * @param params
 */
export const changLogsStatus = (url: string, params: any) => postAction(url, params)

/**
 * 获取日志列表：介绍 or 管理
 * @param url logs/getLogs
 * @param params 查询时要带查询的参数
 */
export const getLogsList = (url: string, params: any) => postAction(url, params)