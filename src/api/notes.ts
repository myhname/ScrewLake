import { getAction, postAction, fileUploadAction, deleteAction } from "@/utils/request/request.ts"

/**
 * 新增 or 编辑 笔记
 * @param url notes/newNote or notes/updateNote
 * @param params
 */
export const editNote = (url: string, params: any) => postAction(url, params)

/**
 * 删除笔记
 * @param url notes/deleteNote
 * @param params
 */
export const deleteNote = (url: string, params: any) => deleteAction(url, params)

/**
 * 获取笔记列表：目录 or 管理
 * @param url notes/getNotes
 * @param params 查询时要带查询的参数
 */
export const getNotesList = (url: string, params: any) => postAction(url, params)

/**
 * 获取文章内容
 * @param url notes/getNoteContent
 * @param params
 */
export const getNoteContent = (url: string, params?: any) => getAction(url, params)

/**
 * 上传笔记：文件形式
 * @param url notes/uploadNote
 * @param params
 */
export const uploadNote = (url: string, params: any) => fileUploadAction(url, params)