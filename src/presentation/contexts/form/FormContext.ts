import { createContext } from 'react'

export type FormStateProps = {
    isLoading: boolean
    email: string
    password: string
    mainError: string | null
    emailError: string | null
    passwordError: string | null
}

const state: FormStateProps = {
    isLoading: false,
    email: '',
    password: '',
    mainError: null,
    emailError: null,
    passwordError: null
}

const initialState = {
    state,
    setState: (() => {}) as React.Dispatch<React.SetStateAction<FormStateProps>>
}

export default createContext(initialState)
