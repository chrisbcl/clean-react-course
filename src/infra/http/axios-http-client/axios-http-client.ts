import { HttpPostClient, HttpPostParams, HttpResponse } from '@/data/protocols/http'
import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient<T = any, R = any> implements HttpPostClient<T, R> {
    async post(params: HttpPostParams<T>): Promise<HttpResponse<R>> {
        let axiosResponse: AxiosResponse
        try {
            axiosResponse = await axios.post(params.url, params.body)
        } catch (error) {
            axiosResponse = error.response
        }

        return {
            statusCode: axiosResponse.status,
            body: axiosResponse.data
        }
    }
}
