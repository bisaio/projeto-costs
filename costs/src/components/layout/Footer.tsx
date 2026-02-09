import styles from './Footer.module.css'
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'

export default function Footer() {
    const FacebookIcon = FaFacebook as any
    const InstagramIcon = FaInstagram as any
    const LinkedinIcon = FaLinkedin as any

    return (
        <footer className={styles.footer}>
            <ul className={styles.list}>
                <li><FacebookIcon /></li>
                <li><InstagramIcon /></li>
                <li><LinkedinIcon /></li>
            </ul>
            <p className={styles.copyright}><span>Costs</span> &copy; 2026</p>
        </footer>
    )
}