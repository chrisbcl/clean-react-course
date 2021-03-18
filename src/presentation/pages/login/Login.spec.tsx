import React from 'react'
import { InvalidCredentialsError } from '@/domain/errors'
import { ValidationStub, AuthenticationSpy } from '@/presentation/test'
import { cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react'
import { Login } from '..'
import faker from 'faker'
import 'jest-localstorage-mock'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

type SutTypes = {
    sut: RenderResult
    authenticationSpy: AuthenticationSpy
}

type SutParams = {
    validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })
const makeSut = (params?: SutParams): SutTypes => {
    const validationStub = new ValidationStub()
    const authenticationSpy = new AuthenticationSpy()
    validationStub.errorMessage = params?.validationError ?? null

    const sut = render(
        <Router history={history}>
            <Login validation={validationStub} authentication={authenticationSpy} />
        </Router>
    )

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

const simulateValidSubmit = async (
    sut: RenderResult,
    email: string = faker.internet.email(),
    password: string = faker.internet.password()
): Promise<void> => {
    populateEmailField(sut, email)
    populatePasswordField(sut, password)

    const form = sut.getByTestId('form')
    fireEvent.submit(form)

    await waitFor(() => form)
}

const testStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
    const emailStatus = sut.getByTestId(`${fieldName}-status`)
    expect(emailStatus.title).toBe(validationError ?? 'Valid')
    expect(emailStatus.textContent).toBe(validationError ? '🔴' : '🔵')
}

const testErrorWrapChildCount = (sut: RenderResult, count: number): void => {
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(count)
}

const testElementExists = (sut: RenderResult, elementTestId: string): void => {
    const element = sut.getByTestId(elementTestId)
    expect(element).toBeTruthy()
}

const testElementText = (sut: RenderResult, elementTestId: string, text: string): void => {
    const element = sut.getByTestId(elementTestId)
    expect(element.textContent).toBe(text)
}
const testButtonDisabledStatus = (sut: RenderResult, buttonTestId: string, isDisabled: boolean): void => {
    const button = sut.getByTestId(buttonTestId) as HTMLButtonElement
    expect(button.disabled).toBe(isDisabled)
}

describe('<Login />', () => {
    afterEach(cleanup)

    beforeEach(() => {
        localStorage.clear()
    })

    it('should start with correct initial state', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })

        testErrorWrapChildCount(sut, 0)
        testButtonDisabledStatus(sut, 'submit', true)
        testStatusForField(sut, 'email', validationError)
        testStatusForField(sut, 'password', validationError)
    })

    it('should call email error if validation fails', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError: validationError })

        populateEmailField(sut)
        testStatusForField(sut, 'email', validationError)
    })

    it('should call password error if validation fails', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })

        populatePasswordField(sut)
        testStatusForField(sut, 'password', validationError)
    })

    it('should show valid email state if Validation succeeds', () => {
        const { sut } = makeSut()

        populateEmailField(sut)
        testStatusForField(sut, 'email')
    })

    it('should show valid password state if Validation succeeds', () => {
        const { sut } = makeSut()

        populatePasswordField(sut)
        testStatusForField(sut, 'password')
    })

    it('should enable submit button if form is valid', () => {
        const { sut } = makeSut()

        populateEmailField(sut)
        populatePasswordField(sut)
        testButtonDisabledStatus(sut, 'submit', false)
    })

    it('should show spinner on submit', async () => {
        const { sut } = makeSut()

        await simulateValidSubmit(sut)
        testElementExists(sut, 'spinner')
    })

    it('should call authentication with correct values', async () => {
        const { sut, authenticationSpy } = makeSut()
        const email = faker.internet.email()
        const password = faker.internet.password()

        await simulateValidSubmit(sut, email, password)
        expect(authenticationSpy.params).toEqual({ email, password })
    })

    it('should call authentication only once', async () => {
        const { sut, authenticationSpy } = makeSut()

        await simulateValidSubmit(sut)
        await simulateValidSubmit(sut)
        expect(authenticationSpy.callsCount).toBe(1)
    })

    it('should not call authentication if form is invalid', async () => {
        const validationError = faker.random.words()
        const { sut, authenticationSpy } = makeSut({ validationError })

        await simulateValidSubmit(sut)
        expect(authenticationSpy.callsCount).toBe(0)
    })

    it('should present error if Authentication fails', async () => {
        const error = new InvalidCredentialsError()
        const { sut, authenticationSpy } = makeSut()

        jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))

        await simulateValidSubmit(sut)
        testElementText(sut, 'main-error', error.message)
        testErrorWrapChildCount(sut, 1)
    })

    it('should add accessToken on local storage on success', async () => {
        const { sut, authenticationSpy } = makeSut()

        await simulateValidSubmit(sut)
        expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', authenticationSpy.account.accessToken)
        expect(history.length).toBe(1)
        expect(history.location.pathname).toBe('/')
    })

    it('should go to signup page', async () => {
        const { sut } = makeSut()

        const register = sut.getByTestId('signup')
        fireEvent.click(register)

        expect(history.length).toBe(2)
        expect(history.location.pathname).toBe('/signup')
    })
})
