export type HttpPostParams<T = object> = {
    url: string
    body?: T
}

export interface HttpPostClient {
    post: <T = object>(params: HttpPostParams<T>) => Promise<void>
}
