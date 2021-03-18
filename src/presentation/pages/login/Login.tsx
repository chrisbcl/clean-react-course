import React, { FormEvent, useEffect, useState } from 'react'
import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import FormContext, { FormStateProps } from '@/presentation/contexts/form/FormContext'
import { Validation } from '@/presentation/protocols/validation'
import styles from './Login.styles.scss'

type LoginProps = {
    validation?: Validation
}

const Login = ({ validation }: LoginProps): JSX.Element => {
    const [state, setState] = useState<FormStateProps>({
        isLoading: false,
        email: '',
        password: '',
        mainError: null,
        emailError: '',
        passwordError: ''
    })

    useEffect(() => {
        setState((prev) => ({ ...prev, emailError: validation?.validate('email', state.email) }))
    }, [state.email])

    useEffect(() => {
        setState((prev) => ({ ...prev, passwordError: validation?.validate('password', state.password) }))
    }, [state.password])

    const onFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        setState((prev) => ({ ...prev, isLoading: true }))
    }

    return (
        <div className={styles.Login}>
            <LoginHeader />
            <FormContext.Provider value={{ state, setState }}>
                <form className={styles.Form} onSubmit={onFormSubmit}>
                    <h2>Login</h2>
                    <Input type='email' name='email' placeholder='Enter your email' />
                    <Input type='password' name='password' placeholder='Enter your password' />
                    <button
                        data-testid='submit'
                        disabled={!!state.emailError || !!state.passwordError}
                        className={styles.Submit}
                        type='submit'
                    >
                        Login
                    </button>
                    <span className={styles.Link}>Create account</span>
                    <FormStatus />
                </form>
            </FormContext.Provider>
            <Footer />
        </div>
    )
}

export default Login
