import React from 'react'
import styles from './Input.styles.scss'

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input = (props: InputProps): JSX.Element => {
    return (
        <div className={styles.InputWrap}>
            <input {...props} />
            <span className={styles.Status}>🔴</span>
        </div>
    )
}

export default Input
