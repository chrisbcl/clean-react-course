import { SaveAccessToken } from '@/domain/usecases'
import { LocalSaveAccessToken } from '@/data/usecases/saveaccesstoken/local-save-access-token'
import { makeLocalStorageAdapter } from '@/main/factories/cache/local-storage-adapter-factory'

export const makeSaveAccessToken = (): SaveAccessToken => {
    return new LocalSaveAccessToken(makeLocalStorageAdapter())
}
