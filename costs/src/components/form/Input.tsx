import styles from './Input.module.css'

interface InputProps {
    type: string,
    label?: string,
    name?: string,
    placeholder?: string
    handleOnChange?: () => void
    value?: any
}

export default function Input({ type, label, name, placeholder, handleOnChange, value }: InputProps) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                id={name}
                name={name}
                placeholder={placeholder}
                onChange={handleOnChange}
                value={value}
            />
        </div>
    )
}