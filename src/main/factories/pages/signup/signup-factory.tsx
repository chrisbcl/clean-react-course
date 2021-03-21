import React from 'react'
import { Signup } from '@/presentation/pages'
import { makeSignupValidation } from '@/main/factories/pages/signup/signup-validation-factory'
import { makeSaveAccessToken } from '@/main/factories/usecases/saveaccesstoken/save-access-token-factory'
import { makeRemoteAddAccount } from '../../usecases/addaccount/remote-add-account-factory'

export const makeSignup = (): JSX.Element => {
    return (
        <Signup
            addAccount={makeRemoteAddAccount()}
            validation={makeSignupValidation()}
            saveAccessToken={makeSaveAccessToken()}
        />
    )
}
