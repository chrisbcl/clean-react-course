import React, { useContext } from 'react'
import { Spinner } from '@/presentation/components'
import FormContext from '@/presentation/contexts/form/FormContext'
import styles from './FormStatus.styles.scss'

const FormStatus = (): JSX.Element => {
    const { isLoading, errorMessage } = useContext(FormContext)
    return (
        <div data-testid='error-wrap' className={styles.ErrorWrap}>
            {isLoading ? <Spinner className={styles.Spinner} /> : null}
            {errorMessage ? <span className={styles.Error}>Error</span> : null}
        </div>
    )
}

export default FormStatus
