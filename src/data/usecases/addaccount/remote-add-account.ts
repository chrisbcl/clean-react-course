import { HttpPostClient } from '@/data/protocols/http'
import { AccountModel } from '@/domain/models'
import { AddAccount, AddAccountParams } from '@/domain/usecases'

export class RemoteAddAccount implements AddAccount {
    constructor(
        private readonly url: string,
        private readonly httpClient: HttpPostClient<AddAccountParams, AccountModel>
    ) {}

    async add(params: AddAccountParams): Promise<AccountModel> {
        const response = await this.httpClient.post({ url: this.url, body: params })
        return response.body as AccountModel
    }
}
