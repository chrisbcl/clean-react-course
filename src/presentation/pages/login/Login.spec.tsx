import React from 'react'
import { InvalidCredentialsError } from '@/domain/errors'
import { ValidationStub, AuthenticationSpy, SaveAccessTokenMock, FormHelper } from '@/presentation/test'
import { cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react'
import { Login } from '@/presentation/pages'
import faker from 'faker'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

type SutTypes = {
    sut: RenderResult
    authenticationSpy: AuthenticationSpy
    saveAccessTokenMock: SaveAccessTokenMock
}

type SutParams = {
    validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })
const makeSut = (params?: SutParams): SutTypes => {
    const validationStub = new ValidationStub()
    const authenticationSpy = new AuthenticationSpy()
    const saveAccessTokenMock = new SaveAccessTokenMock()
    validationStub.errorMessage = params?.validationError ?? null

    const sut = render(
        <Router history={history}>
            <Login
                validation={validationStub}
                authentication={authenticationSpy}
                saveAccessToken={saveAccessTokenMock}
            />
        </Router>
    )

    return { sut, authenticationSpy, saveAccessTokenMock }
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

const testElementExists = (sut: RenderResult, elementTestId: string): void => {
    const element = sut.getByTestId(elementTestId)
    expect(element).toBeTruthy()
}

const testElementText = (sut: RenderResult, elementTestId: string, text: string): void => {
    const element = sut.getByTestId(elementTestId)
    expect(element.textContent).toBe(text)
}

describe('<Login />', () => {
    afterEach(cleanup)

    it('should start with correct initial state', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })

        FormHelper.testChildCount(sut, 'error-wrap', 0)
        FormHelper.testButtonDisabledStatus(sut, 'submit', true)
        FormHelper.testStatusForField(sut, 'email', validationError)
        FormHelper.testStatusForField(sut, 'password', validationError)
    })

    it('should show email error if validation fails', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })

        populateEmailField(sut)
        FormHelper.testStatusForField(sut, 'email', validationError)
    })

    it('should show password error if validation fails', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })

        populatePasswordField(sut)
        FormHelper.testStatusForField(sut, 'password', validationError)
    })

    it('should show valid email state if Validation succeeds', () => {
        const { sut } = makeSut()

        populateEmailField(sut)
        FormHelper.testStatusForField(sut, 'email')
    })

    it('should show valid password state if Validation succeeds', () => {
        const { sut } = makeSut()

        populatePasswordField(sut)
        FormHelper.testStatusForField(sut, 'password')
    })

    it('should enable submit button if form is valid', () => {
        const { sut } = makeSut()

        populateEmailField(sut)
        populatePasswordField(sut)
        FormHelper.testButtonDisabledStatus(sut, 'submit', false)
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
        FormHelper.testChildCount(sut, 'error-wrap', 1)
    })

    it('should call SaveAccessToken on success', async () => {
        const { sut, authenticationSpy, saveAccessTokenMock } = makeSut()

        await simulateValidSubmit(sut)
        expect(saveAccessTokenMock.accessToken).toBe(authenticationSpy.account.accessToken)
        expect(history.length).toBe(1)
        expect(history.location.pathname).toBe('/')
    })

    it('should present error if SsveAccessToken fails', async () => {
        const error = new InvalidCredentialsError()
        const { sut, saveAccessTokenMock } = makeSut()

        jest.spyOn(saveAccessTokenMock, 'save').mockReturnValueOnce(Promise.reject(error))

        await simulateValidSubmit(sut)
        testElementText(sut, 'main-error', error.message)
        FormHelper.testChildCount(sut, 'error-wrap', 1)
    })

    it('should go to signup page', async () => {
        const { sut } = makeSut()

        const register = sut.getByTestId('signup')
        fireEvent.click(register)

        expect(history.length).toBe(2)
        expect(history.location.pathname).toBe('/signup')
    })
})
