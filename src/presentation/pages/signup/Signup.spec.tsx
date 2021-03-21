import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import { Signup } from '@/presentation/pages'

type SutTypes = {
    sut: RenderResult
}

const makeSut = (): SutTypes => {
    const sut = render(<Signup />)

    return { sut }
}

const testChildCount = (sut: RenderResult, fieldTestId: string, count: number): void => {
    const element = sut.getByTestId(fieldTestId)
    expect(element.childElementCount).toBe(count)
}

const testButtonDisabledStatus = (sut: RenderResult, buttonTestId: string, isDisabled: boolean): void => {
    const button = sut.getByTestId(buttonTestId) as HTMLButtonElement
    expect(button.disabled).toBe(isDisabled)
}

const testStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
    const fieldStatus = sut.getByTestId(`${fieldName}-status`)
    expect(fieldStatus.title).toBe(validationError ?? 'Valid')
    expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🔵')
}

describe('<Signup />', () => {
    it('should start with correct initial state', () => {
        const validationError = 'Required'
        const { sut } = makeSut()

        testChildCount(sut, 'error-wrap', 0)
        testButtonDisabledStatus(sut, 'submit', true)
        testStatusForField(sut, 'name', validationError)
        testStatusForField(sut, 'email', validationError)
        testStatusForField(sut, 'password', validationError)
        testStatusForField(sut, 'passwordConfirmation', validationError)
    })
})
