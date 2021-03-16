/* eslint-disable @typescript-eslint/restrict-template-expressions */
import FormContext from '@/presentation/contexts/form/FormContext'
import React, { useContext } from 'react'
import styles from './Input.styles.scss'

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input = (props: InputProps): JSX.Element => {
    const { errorState } = useContext(FormContext)
    // @ts-expect-error
    const error = errorState[props.name]

    const getStatus = (): string => {
        return '🔴'
    }

    const getTitle = (): string => {
        return error
    }

    return (
        <div className={styles.InputWrap}>
            <input {...props} />
            <span data-testid={`${props.name}-status`} title={getTitle()} className={styles.Status}>
                {getStatus()}
            </span>
        </div>
    )
}

export default Input
