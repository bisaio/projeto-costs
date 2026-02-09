import { Link } from 'react-router-dom'
import styles from './LinkButton.module.css'

interface LinkButtonProps {
    link_to: string,
    text: string
}

export default function LinkButton({ link_to, text }: LinkButtonProps) {
    return (
        <Link className={styles.btn} to={link_to}>{text}</Link>
    )
}