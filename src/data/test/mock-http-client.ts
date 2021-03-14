import { HttpPostClient, HttpPostParams } from '@/data/protocols/http/http-post-client'
import { HttpResponse, HttpStatusCode } from '@/data/protocols/http/http-response'

export class HttpPostClientSpy implements HttpPostClient {
    url?: string
    body?: any
    response: HttpResponse = {
        statusCode: HttpStatusCode.NoContent
    }

    async post<T = any>(params: HttpPostParams<T>): Promise<HttpResponse<T>> {
        this.url = params.url
        this.body = params.body
        return this.response
    }
}
