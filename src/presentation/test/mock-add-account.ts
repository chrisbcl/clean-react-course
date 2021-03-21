import { AccountModel } from '@/domain/models'
import { mockAccount } from '@/domain/test'
import { AddAccount, AddAccountParams } from '@/domain/usecases'

export class AddAccountSpy implements AddAccount {
    account: AccountModel = mockAccount()
    params!: AddAccountParams
    callsCount = 0

    async add(params: AddAccountParams): Promise<AccountModel> {
        this.params = params
        this.callsCount++
        return this.account
    }
}
