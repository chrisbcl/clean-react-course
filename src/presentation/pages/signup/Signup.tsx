import React, { useEffect, useState } from 'react'
import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import styles from './Login.styles.scss'
import FormContext from '@/presentation/contexts/form/FormContext'
import { Validation } from '@/presentation/protocols/validation'

type SignupProps = {
    validation: Validation
}

type SignupFormStateProps = {
    isLoading: boolean
    name: string
    email: string
    password: string
    passwordConfirmation: string
    mainError: string | null
    nameError: string | null
    emailError: string | null
    passwordError: string | null
    passwordConfirmationError: string | null
}

const Signup = ({ validation }: SignupProps): JSX.Element => {
    const [state, setState] = useState<SignupFormStateProps>({
        isLoading: false,
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        mainError: null,
        nameError: null,
        emailError: null,
        passwordError: null,
        passwordConfirmationError: null
    })

    useEffect(() => {
        setState((prev) => ({ ...prev, nameError: validation.validate('name', state.name) ?? null }))
    }, [state.name])

    useEffect(() => {
        setState((prev) => ({ ...prev, emailError: validation.validate('email', state.email) ?? null }))
    }, [state.email])

    useEffect(() => {
        setState((prev) => ({ ...prev, passwordError: validation.validate('password', state.password) ?? null }))
    }, [state.password])

    useEffect(() => {
        setState((prev) => ({
            ...prev,
            passwordConfirmationError: validation.validate('passwordConfirmation', state.passwordConfirmation) ?? null
        }))
    }, [state.passwordConfirmation])

    return (
        <div className={styles.Signup}>
            <LoginHeader />
            <FormContext.Provider value={{ state, setState }}>
                <form className={styles.Form}>
                    <h2>Create Account</h2>
                    <Input type='name' name='name' placeholder='Enter your name' />
                    <Input type='email' name='email' placeholder='Enter your email' />
                    <Input type='password' name='password' placeholder='Enter your password' />
                    <Input type='password' name='passwordConfirmation' placeholder='Confirm your password' />
                    <button
                        data-testid='submit'
                        disabled={
                            !!state.nameError ||
                            !!state.emailError ||
                            !!state.passwordError ||
                            !!state.passwordConfirmationError
                        }
                        className={styles.Submit}
                        type='submit'
                    >
                        Create
                    </button>
                    <span className={styles.Link}>Back to Login</span>
                    <FormStatus />
                </form>
            </FormContext.Provider>
            <Footer />
        </div>
    )
}

export default Signup
