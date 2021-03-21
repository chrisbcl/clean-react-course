import React from 'react'
import { cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react'
import { Signup } from '@/presentation/pages'
import { AddAccountSpy, FormHelper, SaveAccessTokenMock, ValidationStub } from '@/presentation/test'
import faker from 'faker'
import { EmailInUseError } from '@/domain/errors'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router'

type SutTypes = {
    sut: RenderResult
    addAccountSpy: AddAccountSpy
    saveAccessTokenMock: SaveAccessTokenMock
}

type SutParams = {
    validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (params?: SutParams): SutTypes => {
    const addAccountSpy = new AddAccountSpy()
    const saveAccessTokenMock = new SaveAccessTokenMock()
    const validationStub = new ValidationStub()
    validationStub.errorMessage = params?.validationError ?? null
    const sut = render(
        <Router history={history}>
            <Signup validation={validationStub} addAccount={addAccountSpy} saveAccessToken={saveAccessTokenMock} />
        </Router>
    )

    return { sut, addAccountSpy, saveAccessTokenMock }
}

const simulateValidSubmit = async (
    sut: RenderResult,
    name: string = faker.name.findName(),
    email: string = faker.internet.email(),
    password: string = faker.internet.password()
): Promise<void> => {
    FormHelper.populateField(sut, 'name', name)
    FormHelper.populateField(sut, 'email', email)
    FormHelper.populateField(sut, 'password', password)
    FormHelper.populateField(sut, 'passwordConfirmation', password)

    const form = sut.getByTestId('form')
    fireEvent.submit(form)

    await waitFor(() => form)
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

    it('should show valid name state if Validation succeeds', () => {
        const { sut } = makeSut()

        FormHelper.populateField(sut, 'name')
        FormHelper.testStatusForField(sut, 'name')
    })

    it('should show valid email state if Validation succeeds', () => {
        const { sut } = makeSut()

        FormHelper.populateField(sut, 'email')
        FormHelper.testStatusForField(sut, 'email')
    })

    it('should show valid password state if Validation succeeds', () => {
        const { sut } = makeSut()

        FormHelper.populateField(sut, 'password')
        FormHelper.testStatusForField(sut, 'password')
    })

    it('should show valid passwordConfirmation state if Validation succeeds', () => {
        const { sut } = makeSut()

        FormHelper.populateField(sut, 'passwordConfirmation')
        FormHelper.testStatusForField(sut, 'passwordConfirmation')
    })

    it('should enable submit button if form is valid', () => {
        const { sut } = makeSut()

        FormHelper.populateField(sut, 'name')
        FormHelper.populateField(sut, 'email')
        FormHelper.populateField(sut, 'password')
        FormHelper.populateField(sut, 'passwordConfirmation')
        FormHelper.testButtonDisabledStatus(sut, 'submit', false)
    })

    it('should show spinner on submit', async () => {
        const { sut } = makeSut()

        await simulateValidSubmit(sut)
        FormHelper.testElementExists(sut, 'spinner')
    })

    it('should call AddAccount with correct values', async () => {
        const { sut, addAccountSpy } = makeSut()
        const name = faker.name.findName()
        const email = faker.internet.email()
        const password = faker.internet.password()

        await simulateValidSubmit(sut, name, email, password)
        expect(addAccountSpy.params).toEqual({ name, email, password, passwordConfirmation: password })
    })

    it('should call AddAccount only once', async () => {
        const { sut, addAccountSpy } = makeSut()

        await simulateValidSubmit(sut)
        await simulateValidSubmit(sut)
        expect(addAccountSpy.callsCount).toBe(1)
    })

    it('should not call authentication if form is invalid', async () => {
        const validationError = faker.random.words()
        const { sut, addAccountSpy } = makeSut({ validationError })

        await simulateValidSubmit(sut)
        expect(addAccountSpy.callsCount).toBe(0)
    })

    it('should present error if AddAccount fails', async () => {
        const error = new EmailInUseError()
        const { sut, addAccountSpy } = makeSut()

        jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)

        await simulateValidSubmit(sut)
        FormHelper.testElementText(sut, 'main-error', error.message)
        FormHelper.testChildCount(sut, 'error-wrap', 1)
    })

    it('should call SaveAccessToken on success', async () => {
        const { sut, addAccountSpy, saveAccessTokenMock } = makeSut()

        await simulateValidSubmit(sut)
        expect(saveAccessTokenMock.accessToken).toBe(addAccountSpy.account.accessToken)
        expect(history.length).toBe(1)
        expect(history.location.pathname).toBe('/')
    })

    it('should present error if SsveAccessToken fails', async () => {
        const error = new EmailInUseError()
        const { sut, saveAccessTokenMock } = makeSut()

        jest.spyOn(saveAccessTokenMock, 'save').mockRejectedValueOnce(error)

        await simulateValidSubmit(sut)
        FormHelper.testElementText(sut, 'main-error', error.message)
        FormHelper.testChildCount(sut, 'error-wrap', 1)
    })
})
