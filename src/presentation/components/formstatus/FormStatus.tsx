import React from 'react'
import { Spinner } from '@/presentation/components'
import styles from './FormStatus.styles.scss'

const FormStatus = (): JSX.Element => {
    return (
        <div className={styles.ErrorWrap}>
            <Spinner className={styles.Spinner} />
            <span className={styles.Error}>Error</span>
        </div>
    )
}

export default FormStatus
