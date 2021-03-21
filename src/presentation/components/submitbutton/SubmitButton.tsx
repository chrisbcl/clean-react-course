import React, { ReactNode } from 'react'

type SubmitButtonProps = {
    disabled?: boolean
    children: ReactNode
}

const SubmitButton = ({ disabled = false, children }: SubmitButtonProps): JSX.Element => {
    return (
        <button data-testid='submit' disabled={disabled} type='submit'>
            {children}
        </button>
    )
}

export default SubmitButton
