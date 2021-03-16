import { createContext } from 'react'

export type FormStateProps = {
    isLoading: boolean
    email: string
    password: string
    mainError: string | null
    emailError: string | undefined
    passwordError: string | undefined
}

const state: FormStateProps = {
    isLoading: false,
    email: '',
    password: '',
    mainError: null,
    emailError: 'Required',
    passwordError: 'Required'
}

const initialState = {
    state,
    setState: (() => {}) as React.Dispatch<React.SetStateAction<FormStateProps>>
}

export default createContext(initialState)
