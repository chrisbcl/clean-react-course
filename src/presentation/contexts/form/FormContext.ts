import { createContext } from 'react'

export type FormStateProps = {
    state: {
        isLoading: boolean
    }
    errorState: {
        mainError: string | null
        email: string
        password: string
    }
}

const initialState: FormStateProps = {
    state: {
        isLoading: false
    },
    errorState: {
        mainError: null,
        email: 'Required',
        password: 'Required'
    }
}

export default createContext(initialState)
