import React from 'react'
import styles from './Spinner.styles.scss'

type SpinnerProps = React.HTMLAttributes<HTMLElement>

const Spinner = (props: SpinnerProps): JSX.Element => {
    return (
        <div {...props} data-testid='spinner' className={[styles.Spinner, props.className].join(' ')}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default Spinner
