import { RemoteAuthentication } from '.'
import { HttpPostClientSpy } from '@/data/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { mockAccount, mockAuthentication } from '@/domain/test'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { AuthenticationParams } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'
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
