import React from 'react'
import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import FormContext from '@/presentation/contexts/form/FormContext'
import styles from './Login.styles.scss'
import { Link } from 'react-router-dom'

const Signup = (): JSX.Element => {
    return (
        <div className={styles.Signup}>
            <LoginHeader />
            <FormContext.Provider value={{ state: {} as any, setState: () => {} }}>
                <form className={styles.Form}>
                    <h2>Create Account</h2>
                    <Input type='name' name='name' placeholder='Enter your name' />
                    <Input type='email' name='email' placeholder='Enter your email' />
                    <Input type='password' name='password' placeholder='Enter your password' />
                    <Input type='password' name='password-confirmation' placeholder='Confirm your password' />
                    <button className={styles.Submit} type='submit'>
                        Create
                    </button>
                    <Link to='/login' className={styles.Link}>
                        Back to Login
                    </Link>
                    <FormStatus />
                </form>
            </FormContext.Provider>
            <Footer />
        </div>
    )
}

export default Signup
