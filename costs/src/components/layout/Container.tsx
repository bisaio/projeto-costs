import styles from './Container.module.css'
import { ReactNode } from 'react'

interface ContainerProps {
    children: ReactNode
    customClass?: string;
}

export default function Container({ children, customClass }: ContainerProps) {
    const dynamicClass = customClass ? styles[customClass] : '';

    return (
        <div className={`${styles.container} ${dynamicClass}`}>
            {children}
        </div>
    )
}