import { HttpPostClient } from '@/data/protocols/http/http-post-client'
import { HttpStatusCode } from '@/data/protocols/http/http-response'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { AccountModel } from '@/domain/models/account'
import { Authentication, AuthenticationParams } from '@/domain/usecases/authentication'

export class RemoteAuthentication implements Authentication {
    constructor(
        private readonly url: string,
        private readonly httpClient: HttpPostClient<AuthenticationParams, AccountModel>
    ) {}

    async auth(params: AuthenticationParams): Promise<AccountModel> {
        const response = await this.httpClient.post({ url: this.url, body: params })

        switch (response.statusCode) {
            case HttpStatusCode.Ok:
                return response.body as AccountModel
            case HttpStatusCode.Unauthorized:
                throw new InvalidCredentialsError()
            default:
                throw new UnexpectedError()
        }
    }
}
