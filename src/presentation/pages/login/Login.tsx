import React, { useState } from 'react'
import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import styles from './Login.styles.scss'
import FormContext, { FormStateProps } from '@/presentation/contexts/form/FormContext'

const Login = (): JSX.Element => {
    const [state] = useState<FormStateProps>({
        isLoading: false,
        errorMessage: null
    })

    return (
        <div className={styles.Login}>
            <LoginHeader />
            <FormContext.Provider value={state}>
                <form className={styles.Form}>
                    <h2>Login</h2>
                    <Input type='email' name='email' placeholder='Enter your email' />
                    <Input type='password' name='password' placeholder='Enter your password' />
                    <button className={styles.Submit} type='submit'>
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
