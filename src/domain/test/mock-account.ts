import { AuthenticationParams } from '@/domain/usecases/authentication'
import faker from 'faker'
import { AccountModel } from '../models/account'

export const mockAuthentication = (): AuthenticationParams => ({
    email: faker.internet.email(),
    password: faker.internet.password()
})

export const mockAccount = (): AccountModel => ({
    accessToken: faker.random.uuid()
})
