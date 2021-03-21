import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import { Signup } from '@/presentation/pages'
import { FormHelper } from '@/presentation/test'

type SutTypes = {
    sut: RenderResult
}

const makeSut = (): SutTypes => {
    const sut = render(<Signup />)

    return { sut }
}

describe('<Signup />', () => {
    it('should start with correct initial state', () => {
        const validationError = 'Required'
        const { sut } = makeSut()

        FormHelper.testChildCount(sut, 'error-wrap', 0)
        FormHelper.testButtonDisabledStatus(sut, 'submit', true)
        FormHelper.testStatusForField(sut, 'name', validationError)
        FormHelper.testStatusForField(sut, 'email', validationError)
        FormHelper.testStatusForField(sut, 'password', validationError)
        FormHelper.testStatusForField(sut, 'passwordConfirmation', validationError)
    })
})
