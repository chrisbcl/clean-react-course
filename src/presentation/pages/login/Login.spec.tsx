import React from 'react'
import { Authentication, AuthenticationParams } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'
import { ValidationStub } from '@/presentation/test'
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
import { Login } from '..'
import faker from 'faker'
import { mockAccount } from '@/domain/test'

class AuthenticationSpy implements Authentication {
    account: AccountModel = mockAccount()
    params!: AuthenticationParams

    async auth(params: AuthenticationParams): Promise<AccountModel> {
        this.params = params
        return Promise.resolve(this.account)
    }
}

type SutTypes = {
    sut: RenderResult
    authenticationSpy: AuthenticationSpy
}

type SutParams = {
    validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
    const validationStub = new ValidationStub()
    validationStub.errorMessage = params?.validationError
    const authenticationSpy = new AuthenticationSpy()
    const sut = render(<Login validation={validationStub} authentication={authenticationSpy} />)
    return { sut, authenticationSpy }
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

    it('should show spinner on submit', () => {
        const {
            sut: { getByTestId }
        } = makeSut()

        const emailInput = getByTestId('email')
        fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

        const passwordInput = getByTestId('password')
        fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })

        const submitButton = getByTestId('submit') as HTMLButtonElement
        fireEvent.click(submitButton)

        const spinner = getByTestId('spinner')
        expect(spinner).toBeTruthy()
    })

    it('should call authentication with correct values', () => {
        const {
            sut: { getByTestId },
            authenticationSpy
        } = makeSut()

        const email = faker.internet.email()
        const emailInput = getByTestId('email')
        fireEvent.input(emailInput, { target: { value: email } })

        const password = faker.internet.password()
        const passwordInput = getByTestId('password')
        fireEvent.input(passwordInput, { target: { value: password } })

        const submitButton = getByTestId('submit') as HTMLButtonElement
        fireEvent.click(submitButton)

        expect(authenticationSpy.params).toEqual({ email, password })
    })
})
