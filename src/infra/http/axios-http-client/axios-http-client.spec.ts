import { AxiosHttpClient } from './axios-http-client'
import axios from 'axios'
import faker from 'faker'
import { HttpPostParams } from '@/data/protocols/http'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const makeSut = (): AxiosHttpClient => new AxiosHttpClient()

const mockPostRequest = (): HttpPostParams<any> => ({
    url: faker.internet.url(),
    body: faker.random.objectElement()
})

describe('AxiosHttpClient', () => {
    it('should call Axios with correct url and verb', async () => {
        const { url } = mockPostRequest()
        const sut = makeSut()
        await sut.post({ url })
        expect(mockedAxios.post).toHaveBeenCalledWith(url)
    })
})
