import Footer from '@/presentation/components/footer/Footer'
import Header from '@/presentation/components/loginheader/LoginHeader'
import Spinner from '@/presentation/components/spinner/Spinner'
import React from 'react'
import styles from './Login.styles.scss'

const Login = (): JSX.Element => {
    return (
        <div className={styles.Login}>
            <Header />
            <form className={styles.Form}>
                <h2>Login</h2>
                <div className={styles.InputWrap}>
                    <input type='email' name='email' placeholder='Enter your email' />
                    <span className={styles.Status}>🔴</span>
                </div>
                <div className={styles.InputWrap}>
                    <input type='password' name='password' placeholder='Enter your password' />
                    <span className={styles.Status}>🔴</span>
                </div>
                <button className={styles.Submit} type='submit'>
                    Login
                </button>
                <span className={styles.Link}>Create account</span>
                <div className={styles.ErrorWrap}>
                    <Spinner className={styles.Spinner} />
                    <span className={styles.Error}>Error</span>
                </div>
            </form>
            <Footer />
        </div>
    )
}

export default Login
