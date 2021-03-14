import { RemoteAuthentication } from './remote-authentication'
import { HttpPostClientSpy } from '@/data/test/mock-http-client'
import { HttpStatusCode } from '@/data/protocols/http/http-response'
import { mockAuthentication } from '@/domain/test/mock-authentication'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import faker from 'faker'

type SutTypes = {
    sut: RemoteAuthentication
    httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
    const httpPostClientSpy = new HttpPostClientSpy()
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
        const authenticationParams = mockAuthentication()
        const responsePromise = sut.auth(authenticationParams)
        await expect(responsePromise).rejects.toThrow(new InvalidCredentialsError())
    })

    it('should throw UnexpectedError if HttpPostClient return 400', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.BadRequest
        }
        const authenticationParams = mockAuthentication()
        const responsePromise = sut.auth(authenticationParams)
        await expect(responsePromise).rejects.toThrow(new UnexpectedError())
    })

    it('should throw UnexpectedError if HttpPostClient return 404', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.BadRequest
        }
        const authenticationParams = mockAuthentication()
        const responsePromise = sut.auth(authenticationParams)
        await expect(responsePromise).rejects.toThrow(new UnexpectedError())
    })

    it('should throw UnexpectedError if HttpPostClient return 500', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.BadRequest
        }
        const authenticationParams = mockAuthentication()
        const responsePromise = sut.auth(authenticationParams)
        await expect(responsePromise).rejects.toThrow(new UnexpectedError())
    })
})
