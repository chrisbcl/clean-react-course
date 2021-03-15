import React, { memo } from 'react'
import Logo from '../logo/Logo'
import styles from './LoginHeader.styles.scss'

const LoginHeader = (): JSX.Element => {
    return (
        <header className={styles.Header}>
            <Logo />
            <h1>Clean React App</h1>
        </header>
    )
}

export default memo(LoginHeader)
