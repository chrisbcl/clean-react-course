import React, { FormEvent, useEffect, useState } from 'react'
import { Authentication } from '@/domain/usecases'
import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import FormContext, { FormStateProps } from '@/presentation/contexts/form/FormContext'
import { Validation } from '@/presentation/protocols/validation'
import styles from './Login.styles.scss'
import { Link } from 'react-router-dom'

type LoginProps = {
    validation?: Validation
    authentication?: Authentication
}

const Login = ({ validation, authentication }: LoginProps): JSX.Element => {
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

    const onFormSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()

        if (state.isLoading || !authentication || (state.emailError ?? state.passwordError)) {
            return
        }
        try {
            setState((prev) => ({ ...prev, isLoading: true }))
            const account = await authentication.auth({
                email: state.email,
                password: state.password
            })
            localStorage.setItem('accessToken', account?.accessToken)
        } catch (error) {
            setState((prev) => ({
                ...prev,
                mainError: error.message,
                isLoading: false
            }))
        }
    }

    return (
        <div className={styles.Login}>
            <LoginHeader />
            <FormContext.Provider value={{ state, setState }}>
                <form data-testid='form' className={styles.Form} onSubmit={onFormSubmit}>
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
                    <Link data-testid='signup' to='/signup' className={styles.Link}>
                        Create account
                    </Link>
                    <FormStatus />
                </form>
            </FormContext.Provider>
            <Footer />
        </div>
    )
}

export default Login
