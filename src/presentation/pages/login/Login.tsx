import React from 'react'
import Footer from '@/presentation/components/footer/Footer'
import FormStatus from '@/presentation/components/formstatus/FormStatus'
import Input from '@/presentation/components/input/Input'
import Header from '@/presentation/components/loginheader/LoginHeader'
import styles from './Login.styles.scss'

const Login = (): JSX.Element => {
    return (
        <div className={styles.Login}>
            <Header />
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
