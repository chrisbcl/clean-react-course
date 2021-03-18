import React, { useContext } from 'react'
import { Spinner } from '@/presentation/components'
import FormContext from '@/presentation/contexts/form/FormContext'
import styles from './FormStatus.styles.scss'

const FormStatus = (): JSX.Element => {
    const {
        state: { isLoading, mainError }
    } = useContext(FormContext)
    return (
        <div data-testid='error-wrap' className={styles.ErrorWrap}>
            {isLoading ? <Spinner className={styles.Spinner} /> : null}
            {mainError
                ? (
                    <span data-testid='main-error' className={styles.Error}>
                        {mainError}
                    </span>
                )
                : null}
        </div>
    )
}

export default FormStatus
