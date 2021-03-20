import { RemoteAddAccount } from '@/data/usecases/addaccount/remote-add-account'
import { HttpPostClientSpy } from '@/data/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { mockAccount, mockAddAccountParams } from '@/domain/test'
import { AddAccountParams } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'
import { EmailInUseError, UnexpectedError } from '@/domain/errors'
import faker from 'faker'

type SutTypes = {
    sut: RemoteAddAccount
    httpPostClientSpy: HttpPostClientSpy<AddAccountParams, AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
    const httpPostClientSpy = new HttpPostClientSpy<AddAccountParams, AccountModel>()
    const sut = new RemoteAddAccount(url, httpPostClientSpy)

    return {
        sut,
        httpPostClientSpy
    }
}

describe('RemoteAddAccount', () => {
    it('should call HttpClient with correct URL', async () => {
        const url = faker.internet.url()
        const { sut, httpPostClientSpy } = makeSut(url)
        await sut.add(mockAddAccountParams())
        expect(httpPostClientSpy.url).toBe(url)
    })

    it('should call HttpClient with correct body', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        const addAccountParams = mockAddAccountParams()
        await sut.add(addAccountParams)
        expect(httpPostClientSpy.body).toEqual(addAccountParams)
    })

    it('should throw EmailInUseError if HttpPostClient return 403', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.Forbidden
        }
        const responsePromise = sut.add(mockAddAccountParams())
        await expect(responsePromise).rejects.toThrow(new EmailInUseError())
    })

    it('should throw UnexpectedError if HttpPostClient return 400', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.BadRequest
        }
        const responsePromise = sut.add(mockAddAccountParams())
        await expect(responsePromise).rejects.toThrow(new UnexpectedError())
    })

    it('should throw UnexpectedError if HttpPostClient return 404', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.BadRequest
        }
        const responsePromise = sut.add(mockAddAccountParams())
        await expect(responsePromise).rejects.toThrow(new UnexpectedError())
    })

    it('should throw UnexpectedError if HttpPostClient return 500', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.BadRequest
        }
        const responsePromise = sut.add(mockAddAccountParams())
        await expect(responsePromise).rejects.toThrow(new UnexpectedError())
    })

    it('should return an AccountModel if HttpPostClient returns 200', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        const httpResponse: AccountModel = mockAccount()

        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.Ok,
            body: httpResponse
        }
        const responsePromise = sut.add(mockAddAccountParams())
        await expect(responsePromise).resolves.toEqual(httpResponse)
    })
})
