import styles from './SubmitButton.module.css'

interface SubmitButtonProps {
    text: string,
}

export default function SubmitButton({ text }: SubmitButtonProps) {
    return (
        <div className={styles.form_control}>
            <button>{text}</button>
        </div>
    )
}