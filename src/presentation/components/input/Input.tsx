/* eslint-disable @typescript-eslint/restrict-template-expressions */
import FormContext from '@/presentation/contexts/form/FormContext'
import React, { useContext } from 'react'
import styles from './Input.styles.scss'

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input = (props: InputProps): JSX.Element => {
    const { state, setState } = useContext(FormContext)
    const error = state[`${props.name}Error`]

    const getStatus = (): string => {
        return error ? '🔴' : '🔵'
    }

    const getTitle = (): string => {
        return error || 'Valid'
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setState((prev: any) => ({ ...prev, [props.name as string]: e.target.value }))
    }

    return (
        <div className={styles.InputWrap}>
            <input {...props} data-testid={props.name} onChange={onInputChange} />
            <span data-testid={`${props.name}-status`} title={getTitle()} className={styles.Status}>
                {getStatus()}
            </span>
        </div>
    )
}

export default Input
