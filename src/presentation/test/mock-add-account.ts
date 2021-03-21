import { AccountModel } from '@/domain/models'
import { mockAccount } from '@/domain/test'
import { AddAccount, AddAccountParams } from '@/domain/usecases'

export class AddAccountSpy implements AddAccount {
    account: AccountModel = mockAccount()
    params!: AddAccountParams

    async add(params: AddAccountParams): Promise<AccountModel> {
        this.params = params
        return this.account
    }
}
