export interface UserInfoInterface {
    name: string // 用户名
    signature: string // 签名
}

export interface TableDataResponse<T> {
    total: number
    records: Array<T>
}