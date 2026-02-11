import styles from './Select.module.css'

interface OptionsProps {
    id: number,
    name: string
}

interface SelectProps {
    label?: string,
    name?: string,
    options?: Array<OptionsProps>,
    handleOnChange?: () => void
    value?: any
}

export default function Select({ label, name, options, handleOnChange, value }: SelectProps) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{label}</label>
            <select
                id={name}
                name={name}
                onChange={handleOnChange}
                value={value}
            >
                <option value="">Select an option</option>
                {options && options.map(option => <option key={option.id} value={option.id}>{option.name}</option>)}
            </select>
        </div>
    )
}