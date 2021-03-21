import { fireEvent, RenderResult } from '@testing-library/react'
import faker from 'faker'

export const testChildCount = (sut: RenderResult, fieldTestId: string, count: number): void => {
    const element = sut.getByTestId(fieldTestId)
    expect(element.childElementCount).toBe(count)
}

export const testButtonDisabledStatus = (sut: RenderResult, buttonTestId: string, isDisabled: boolean): void => {
    const button = sut.getByTestId(buttonTestId) as HTMLButtonElement
    expect(button.disabled).toBe(isDisabled)
}

export const testStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
    const fieldStatus = sut.getByTestId(`${fieldName}-status`)
    expect(fieldStatus.title).toBe(validationError ?? 'Valid')
    expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🔵')
}

export const populateField = (
    { getByTestId }: RenderResult,
    fieldTestId: string,
    value: any = faker.random.word()
): void => {
    const input = getByTestId(fieldTestId)
    fireEvent.input(input, { target: { value } })
}

export const testElementExists = (sut: RenderResult, elementTestId: string): void => {
    const element = sut.getByTestId(elementTestId)
    expect(element).toBeTruthy()
}
