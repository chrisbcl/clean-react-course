import { createContext } from 'react'

export type FormStateProps = {
    isLoading: boolean
    errorMessage: string | null
}

const initialState: FormStateProps = {
    isLoading: false,
    errorMessage: null
}

export default createContext(initialState)
