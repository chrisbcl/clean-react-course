export enum HttpStatusCode {
    NoContent = 204,
    Unauthorized = 401
}

export type HttpResponse<T = any> = {
    statusCode: HttpStatusCode
    body?: T
}
