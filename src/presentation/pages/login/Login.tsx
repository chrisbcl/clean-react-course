import React, { FormEvent, useEffect, useState } from 'react'
import { Authentication, SaveAccessToken } from '@/domain/usecases'
import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import FormContext from '@/presentation/contexts/form/FormContext'
import { Validation } from '@/presentation/protocols/validation'
import styles from './Login.styles.scss'
import { Link, useHistory } from 'react-router-dom'
import SubmitButton from '@/presentation/components/submitbutton/SubmitButton'

type LoginProps = {
    validation: Validation
    authentication: Authentication
    saveAccessToken: SaveAccessToken
}

type LoginFormStateProps = {
    isLoading: boolean
    isFormInvalid: boolean
    email: string
    password: string
    mainError: string | null
    emailError: string | null
    passwordError: string | null
}

const Login = ({ validation, authentication, saveAccessToken }: LoginProps): JSX.Element => {
    const history = useHistory()
    const [state, setState] = useState<LoginFormStateProps>({
        isLoading: false,
        isFormInvalid: true,
        email: '',
        password: '',
        mainError: null,
        emailError: null,
        passwordError: null
    })

    useEffect(() => {
        const emailError = validation.validate('email', state.email)
        const passwordError = validation.validate('password', state.password)

        setState((prev) => ({
            ...prev,
            emailError,
            passwordError,
            isFormInvalid: !!emailError || !!passwordError
        }))
    }, [state.email, state.password])

    const onFormSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()

        if (state.isLoading || !!state.isFormInvalid) {
            return
        }
        try {
            setState((prev) => ({ ...prev, isLoading: true }))
            const account = await authentication.auth({
                email: state.email,
                password: state.password
            })
            await saveAccessToken.save(account.accessToken)
            history.replace('/')
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
                    <SubmitButton disabled={state.isFormInvalid}>Login</SubmitButton>
                    <Link data-testid='signup-link' to='/signup' className={styles.Link}>
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
