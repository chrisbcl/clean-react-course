import React, { useEffect, useState } from 'react'
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
        emailError: 'Required',
        passwordError: 'Required'
    })

    useEffect(() => {
        validation?.validate({ email: state.email })
    }, [state.email])

    return (
        <div className={styles.Login}>
            <LoginHeader />
            <FormContext.Provider value={{ state, setState }}>
                <form className={styles.Form}>
                    <h2>Login</h2>
                    <Input type='email' name='email' placeholder='Enter your email' />
                    <Input type='password' name='password' placeholder='Enter your password' />
                    <button data-testid='submit' disabled className={styles.Submit} type='submit'>
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
