import React, { FormEvent, useEffect, useState } from 'react'
import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import FormContext from '@/presentation/contexts/form/FormContext'
import { Validation } from '@/presentation/protocols/validation'
import SubmitButton from '@/presentation/components/submitbutton/SubmitButton'
import { AddAccount, SaveAccessToken } from '@/domain/usecases'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import styles from './Signup.styles.scss'

type SignupProps = {
    validation: Validation
    addAccount: AddAccount
    saveAccessToken: SaveAccessToken
}

type SignupFormStateProps = {
    isLoading: boolean
    isFormInvalid: boolean
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

const Signup = ({ validation, addAccount, saveAccessToken }: SignupProps): JSX.Element => {
    const history = useHistory()
    const [state, setState] = useState<SignupFormStateProps>({
        isLoading: false,
        isFormInvalid: true,
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        mainError: null,
        nameError: null,
        emailError: null,
        passwordError: null,
        passwordConfirmationError: null
    })

    useEffect(() => {
        const { name, email, password, passwordConfirmation } = state
        const formData = { name, email, password, passwordConfirmation }
        const nameError = validation.validate('name', formData)
        const emailError = validation.validate('email', formData)
        const passwordError = validation.validate('password', formData)
        const passwordConfirmationError = validation.validate('passwordConfirmation', formData)

        setState((prev) => ({
            ...prev,
            nameError,
            emailError,
            passwordError,
            passwordConfirmationError,
            isFormInvalid: !!nameError || !!emailError || !!passwordError || !!passwordConfirmationError
        }))
    }, [state.name, state.email, state.password, state.passwordConfirmation])

    const onFormSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()

        if (state.isLoading || state.isFormInvalid) {
            return
        }
        try {
            setState((prev) => ({ ...prev, isLoading: true }))
            const account = await addAccount.add({
                name: state.name,
                email: state.email,
                password: state.password,
                passwordConfirmation: state.passwordConfirmation
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
        <div className={styles.Signup}>
            <LoginHeader />
            <FormContext.Provider value={{ state, setState }}>
                <form data-testid='form' className={styles.Form} onSubmit={onFormSubmit}>
                    <h2>Create Account</h2>
                    <Input type='name' name='name' placeholder='Enter your name' />
                    <Input type='email' name='email' placeholder='Enter your email' />
                    <Input type='password' name='password' placeholder='Enter your password' />
                    <Input type='password' name='passwordConfirmation' placeholder='Confirm your password' />
                    <SubmitButton disabled={state.isFormInvalid}>Create</SubmitButton>
                    <Link data-testid='login-link' replace to='/login' className={styles.Link}>
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
