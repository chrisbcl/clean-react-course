import { RemoteAuthentication } from './remote-authentication'
import { HttpPostClientSpy } from '@/data/test/mock-http-client'
import { HttpStatusCode } from '@/data/protocols/http/http-response'
import { mockAccount, mockAuthentication } from '@/domain/test/mock-account'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { AuthenticationParams } from '@/domain/usecases/authentication'
import { AccountModel } from '@/domain/models/account'
import faker from 'faker'

type SutTypes = {
    sut: RemoteAuthentication
    httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
    const httpPostClientSpy = new HttpPostClientSpy<AuthenticationParams, AccountModel>()
    const sut = new RemoteAuthentication(url, httpPostClientSpy)

    return {
        sut,
        httpPostClientSpy
    }
}

describe('RemoteAuthentication', () => {
    it('should call HttpClient with correct URL', async () => {
        const url = faker.internet.url()
        const { sut, httpPostClientSpy } = makeSut(url)
        await sut.auth(mockAuthentication())
        expect(httpPostClientSpy.url).toBe(url)
    })

    it('should call HttpClient with correct body', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        const authenticationParams = mockAuthentication()
        await sut.auth(authenticationParams)
        expect(httpPostClientSpy.body).toEqual(authenticationParams)
    })

    it('should throw InvalidCredentialsError if HttpPostClient return 401', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.Unauthorized
        }
        const responsePromise = sut.auth(mockAuthentication())
        await expect(responsePromise).rejects.toThrow(new InvalidCredentialsError())
    })

    it('should throw UnexpectedError if HttpPostClient return 400', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.BadRequest
        }
        const responsePromise = sut.auth(mockAuthentication())
        await expect(responsePromise).rejects.toThrow(new UnexpectedError())
    })

    it('should throw UnexpectedError if HttpPostClient return 404', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.BadRequest
        }
        const responsePromise = sut.auth(mockAuthentication())
        await expect(responsePromise).rejects.toThrow(new UnexpectedError())
    })

    it('should throw UnexpectedError if HttpPostClient return 500', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.BadRequest
        }
        const responsePromise = sut.auth(mockAuthentication())
        await expect(responsePromise).rejects.toThrow(new UnexpectedError())
    })

    it('should return an AccountModel if HttpPostClient returns 200', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        const httpResponse: AccountModel = mockAccount()

        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.Ok,
            body: httpResponse
        }
        const responsePromise = sut.auth(mockAuthentication())
        await expect(responsePromise).resolves.toEqual(httpResponse)
    })
})
