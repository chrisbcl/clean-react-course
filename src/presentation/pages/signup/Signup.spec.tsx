import React from 'react'
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
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

const populateField = ({ getByTestId }: RenderResult, fieldTestId: string, value: any = faker.random.word()): void => {
    const input = getByTestId(fieldTestId)
    fireEvent.input(input, { target: { value } })
}

describe('<Signup />', () => {
    afterEach(cleanup)

    it('should start with correct initial state', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })

        FormHelper.testChildCount(sut, 'error-wrap', 0)
        FormHelper.testButtonDisabledStatus(sut, 'submit', true)
        FormHelper.testStatusForField(sut, 'name', validationError)
        FormHelper.testStatusForField(sut, 'email', 'Required')
        FormHelper.testStatusForField(sut, 'password', 'Required')
        FormHelper.testStatusForField(sut, 'passwordConfirmation', 'Required')
    })

    it('should show name error if validation fails', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })

        populateField(sut, 'name')
        FormHelper.testStatusForField(sut, 'name', validationError)
    })
})
