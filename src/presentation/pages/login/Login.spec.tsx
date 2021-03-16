import React from 'react'
import { render } from '@testing-library/react'
import { Login } from '..'

describe('<Login />', () => {
    it('should start with correct initial state', () => {
        const { getByTestId } = render(<Login />)

        const errorWrap = getByTestId('error-wrap')
        expect(errorWrap.childElementCount).toBe(0)

        const submitButton = getByTestId('submit') as HTMLButtonElement
        expect(submitButton.disabled).toBe(true)

        const emailStatus = getByTestId('email-status')
        expect(emailStatus.title).toBe('Required')
        expect(emailStatus.textContent).toBe('🔴')

        const passwordStatus = getByTestId('password-status')
        expect(passwordStatus.title).toBe('Required')
        expect(passwordStatus.textContent).toBe('🔴')
    })
})
