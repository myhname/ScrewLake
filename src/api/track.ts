import { postAction, deleteAction } from "@/utils/request/request.ts"

/**
 * 埋点：浏览、点赞、页面访问量
 * @param url track/newTrack
 * @param params
 */
export const track = (url: string, params: any) => postAction(url, params)