import React from 'react'
import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import styles from './Login.styles.scss'

const Login = (): JSX.Element => {
    return (
        <div className={styles.Login}>
            <LoginHeader />
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
            <Footer />
        </div>
    )
}

export default Login
