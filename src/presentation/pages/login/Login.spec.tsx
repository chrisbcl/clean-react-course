import React from 'react'
import { ValidationStub } from '@/presentation/test'
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
import { Login } from '..'
import faker from 'faker'

type SutTypes = {
    sut: RenderResult
}

type SutParams = {
    validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
    const validationStub = new ValidationStub()
    validationStub.errorMessage = params?.validationError
    const sut = render(<Login validation={validationStub} />)
    return { sut }
}

describe('<Login />', () => {
    afterEach(cleanup)

    it('should start with correct initial state', () => {
        const errorMessage = faker.random.words()
        const {
            sut: { getByTestId }
        } = makeSut({ validationError: errorMessage })

        const errorWrap = getByTestId('error-wrap')
        expect(errorWrap.childElementCount).toBe(0)

        const submitButton = getByTestId('submit') as HTMLButtonElement
        expect(submitButton.disabled).toBe(true)

        const emailStatus = getByTestId('email-status')
        expect(emailStatus.title).toBe(errorMessage)
        expect(emailStatus.textContent).toBe('🔴')

        const passwordStatus = getByTestId('password-status')
        expect(passwordStatus.title).toBe(errorMessage)
        expect(passwordStatus.textContent).toBe('🔴')
    })

    it('should call email error if validation fails', () => {
        const errorMessage = faker.random.words()
        const {
            sut: { getByTestId }
        } = makeSut({ validationError: errorMessage })

        const emailInput = getByTestId('email')
        fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

        const emailStatus = getByTestId('email-status')
        expect(emailStatus.title).toBe(errorMessage)
        expect(emailStatus.textContent).toBe('🔴')
    })

    it('should call password error if validation fails', () => {
        const errorMessage = faker.random.words()
        const {
            sut: { getByTestId }
        } = makeSut({ validationError: errorMessage })

        const passwordInput = getByTestId('password')
        fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })

        const passwordStatus = getByTestId('password-status')
        expect(passwordStatus.title).toBe(errorMessage)
        expect(passwordStatus.textContent).toBe('🔴')
    })

    it('should show valid email state if Validation succeeds', () => {
        const {
            sut: { getByTestId }
        } = makeSut()
        const emailInput = getByTestId('email')
        fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

        const emailStatus = getByTestId('email-status')
        expect(emailStatus.title).toBe('Valid')
        expect(emailStatus.textContent).toBe('🔵')
    })

    it('should show valid password state if Validation succeeds', () => {
        const {
            sut: { getByTestId }
        } = makeSut()
        const passwordInput = getByTestId('password')
        fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })

        const passwordStatus = getByTestId('password-status')
        expect(passwordStatus.title).toBe('Valid')
        expect(passwordStatus.textContent).toBe('🔵')
    })

    it('should enable submit button if form is valid', () => {
        const {
            sut: { getByTestId }
        } = makeSut()

        const emailInput = getByTestId('email')
        fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

        const passwordInput = getByTestId('password')
        fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })

        const submitButton = getByTestId('submit') as HTMLButtonElement
        expect(submitButton.disabled).toBe(false)
    })
})
