import React from 'react'
import { cleanup, render, RenderResult } from '@testing-library/react'
import { Signup } from '@/presentation/pages'
import { FormHelper, ValidationStub } from '@/presentation/test'
import faker from 'faker'

type SutTypes = {
    sut: RenderResult
}

type SutParams = {
    validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
    const validationStub = new ValidationStub()
    validationStub.errorMessage = params?.validationError ?? null
    const sut = render(<Signup validation={validationStub} />)

    return { sut }
}

describe('<Signup />', () => {
    afterEach(cleanup)

    it('should start with correct initial state', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })

        FormHelper.testChildCount(sut, 'error-wrap', 0)
        FormHelper.testButtonDisabledStatus(sut, 'submit', true)
        FormHelper.testStatusForField(sut, 'name', validationError)
        FormHelper.testStatusForField(sut, 'email', validationError)
        FormHelper.testStatusForField(sut, 'password', validationError)
        FormHelper.testStatusForField(sut, 'passwordConfirmation', validationError)
    })

    it('should show name error if validation fails', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })

        FormHelper.populateField(sut, 'name')
        FormHelper.testStatusForField(sut, 'name', validationError)
    })

    it('should show email error if validation fails', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })

        FormHelper.populateField(sut, 'email')
        FormHelper.testStatusForField(sut, 'email', validationError)
    })

    it('should show password error if validation fails', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })

        FormHelper.populateField(sut, 'password')
        FormHelper.testStatusForField(sut, 'password', validationError)
    })

    it('should show password confirmation error if validation fails', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })

        FormHelper.populateField(sut, 'passwordConfirmation')
        FormHelper.testStatusForField(sut, 'passwordConfirmation', validationError)
    })
})
