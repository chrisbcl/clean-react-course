import React from 'react'
import { ValidationStub, AuthenticationSpy } from '@/presentation/test'
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
import { Login } from '..'
import faker from 'faker'

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

const populateEmailField = ({ getByTestId }: RenderResult, email: string = faker.internet.email()): void => {
    const emailInput = getByTestId('email')
    fireEvent.input(emailInput, { target: { value: email } })
}

const populatePasswordField = ({ getByTestId }: RenderResult, password: string = faker.internet.password()): void => {
    const passwordInput = getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: password } })
}

const simulateValidSubmit = (
    sut: RenderResult,
    email: string = faker.internet.email(),
    password: string = faker.internet.password()
): void => {
    populateEmailField(sut, email)
    populatePasswordField(sut, password)

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    fireEvent.click(submitButton)
}

const simulateStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
    const emailStatus = sut.getByTestId(`${fieldName}-status`)
    expect(emailStatus.title).toBe(validationError ?? 'Valid')
    expect(emailStatus.textContent).toBe(validationError ? '🔴' : '🔵')
}

describe('<Login />', () => {
    afterEach(cleanup)

    it('should start with correct initial state', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })

        const errorWrap = sut.getByTestId('error-wrap')
        expect(errorWrap.childElementCount).toBe(0)

        const submitButton = sut.getByTestId('submit') as HTMLButtonElement
        expect(submitButton.disabled).toBe(true)

        simulateStatusForField(sut, 'email', validationError)
        simulateStatusForField(sut, 'password', validationError)
    })

    it('should call email error if validation fails', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError: validationError })

        populateEmailField(sut)

        simulateStatusForField(sut, 'email', validationError)
    })

    it('should call password error if validation fails', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })

        populatePasswordField(sut)

        simulateStatusForField(sut, 'password', validationError)
    })

    it('should show valid email state if Validation succeeds', () => {
        const { sut } = makeSut()

        populateEmailField(sut)

        simulateStatusForField(sut, 'email')
    })

    it('should show valid password state if Validation succeeds', () => {
        const { sut } = makeSut()

        populatePasswordField(sut)

        simulateStatusForField(sut, 'password')
    })

    it('should enable submit button if form is valid', () => {
        const { sut } = makeSut()

        populateEmailField(sut)
        populatePasswordField(sut)

        const submitButton = sut.getByTestId('submit') as HTMLButtonElement
        expect(submitButton.disabled).toBe(false)
    })

    it('should show spinner on submit', () => {
        const { sut } = makeSut()

        simulateValidSubmit(sut)

        const spinner = sut.getByTestId('spinner')
        expect(spinner).toBeTruthy()
    })

    it('should call authentication with correct values', () => {
        const { sut, authenticationSpy } = makeSut()
        const email = faker.internet.email()
        const password = faker.internet.password()

        simulateValidSubmit(sut, email, password)

        expect(authenticationSpy.params).toEqual({ email, password })
    })

    it('should call authentication only once', () => {
        const { sut, authenticationSpy } = makeSut()

        simulateValidSubmit(sut)
        simulateValidSubmit(sut)

        expect(authenticationSpy.callsCount).toBe(1)
    })

    it('should not call authentication if form is invalid', () => {
        const validationError = faker.random.words()
        const { sut, authenticationSpy } = makeSut({ validationError })

        populateEmailField(sut)

        fireEvent.submit(sut.getByTestId('form'))

        expect(authenticationSpy.callsCount).toBe(0)
    })
})
