import { HttpPostClient, HttpPostParams } from 'data/protocols/http/http-post-client'

export class HttpPostClientSpy implements HttpPostClient {
    url?: string
    body?: any

    async post<T = object>(params: HttpPostParams<T>): Promise<void> {
        this.url = params.url
        this.body = params.body
        return await Promise.resolve()
    }
}
