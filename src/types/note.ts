/**
 * 笔记列表数据
 */
export interface NoteList {
    id: number
    title: string
    coverImg: string
    description: string
    createTime: string
    updateTime: string
    tags: Array<LabelValue>
    isOmit?: boolean
    flexDirection?: string
    statistics: Array<LabelValue>
}