import { SetStorageSpy } from '@/data/test/mock-storage'
import { LocalSaveAccessToken } from './local-save-access-token'
import faker from 'faker'

describe('LocalSaveAccessToken', () => {
    it('should call SetStorage with correct value', async () => {
        const setStorageSpy = new SetStorageSpy()
        const sut = new LocalSaveAccessToken(setStorageSpy)
        const token = faker.random.uuid()
        await sut.save(token)

        expect(setStorageSpy.key).toBe('accessToken')
        expect(setStorageSpy.value).toBe(token)
    })
})
