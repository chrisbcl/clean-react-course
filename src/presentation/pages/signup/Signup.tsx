import React, { useState } from 'react'
import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import styles from './Login.styles.scss'
import FormContext from '@/presentation/contexts/form/FormContext'

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

const Signup = (): JSX.Element => {
    const [state] = useState<SignupFormStateProps>({
        isLoading: false,
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        mainError: null,
        nameError: 'Required',
        emailError: 'Required',
        passwordError: 'Required',
        passwordConfirmationError: 'Required'
    })

    return (
        <div className={styles.Signup}>
            <LoginHeader />
            <FormContext.Provider value={{ state, setState: () => {} }}>
                <form className={styles.Form}>
                    <h2>Create Account</h2>
                    <Input type='name' name='name' placeholder='Enter your name' />
                    <Input type='email' name='email' placeholder='Enter your email' />
                    <Input type='password' name='password' placeholder='Enter your password' />
                    <Input type='password' name='passwordConfirmation' placeholder='Confirm your password' />
                    <button data-testid='submit' disabled className={styles.Submit} type='submit'>
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
