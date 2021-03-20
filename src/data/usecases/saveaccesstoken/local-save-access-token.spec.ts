import { SetStorageMock } from '@/data/test/mock-storage'
import { LocalSaveAccessToken } from './local-save-access-token'
import faker from 'faker'

type SutTypes = {
    sut: LocalSaveAccessToken
    setStorageMock: SetStorageMock
}

const makeSut = (): SutTypes => {
    const setStorageMock = new SetStorageMock()
    const sut = new LocalSaveAccessToken(setStorageMock)

    return { sut, setStorageMock }
}

describe('LocalSaveAccessToken', () => {
    it('should call SetStorage with correct value', async () => {
        const { sut, setStorageMock } = makeSut()
        const token = faker.random.uuid()
        await sut.save(token)

        expect(setStorageMock.key).toBe('accessToken')
        expect(setStorageMock.value).toBe(token)
    })
})
