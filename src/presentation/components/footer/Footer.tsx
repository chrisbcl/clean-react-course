import React, { memo } from 'react'
import styles from './Footer.styles.scss'

const Footer = (): JSX.Element => {
    return <footer className={styles.Footer} />
}

export default memo(Footer)
