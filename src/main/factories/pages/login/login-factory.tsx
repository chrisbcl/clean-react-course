import React from 'react'
import { Login } from '@/presentation/pages'
import { makeRemoteAuthentication } from '@/main/factories/usecases/authentication/remote-authentication-factory'
import { makeLoginValidation } from '@/main/factories/pages/login/login-validation-factory'
import { makeSaveAccessToken } from '@/main/factories/usecases/saveaccesstoken/save-access-token-factory'

export const makeLogin = (): JSX.Element => {
    return (
        <Login
            authentication={makeRemoteAuthentication()}
            validation={makeLoginValidation()}
            saveAccessToken={makeSaveAccessToken()}
        />
    )
}
