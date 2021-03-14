import { HttpPostClient } from '@/data/protocols/http/http-post-client'
import { HttpStatusCode } from '@/data/protocols/http/http-response'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { AuthenticationParams } from '@/domain/usecases/authentication'

export class RemoteAuthentication {
    constructor(private readonly url: string, private readonly httpClient: HttpPostClient) {}

    async auth(params: AuthenticationParams): Promise<void> {
        const response = await this.httpClient.post({ url: this.url, body: params })

        switch (response.statusCode) {
            case HttpStatusCode.Ok:
                break
            case HttpStatusCode.Unauthorized:
                throw new InvalidCredentialsError()
            default:
                throw new UnexpectedError()
        }
    }
}
