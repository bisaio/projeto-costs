import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import styles from './ProjectForm.module.css'

interface ProjectFormProps {
    btnText: string
}

export default function ProjectForm({ btnText }: ProjectFormProps) {
    return (
        <form className={styles.form}>
            <Input type='text' label='Name' name='name' placeholder='Insert project name' />
            <Input type='number' label='Budget' name='budget' placeholder='Insert total budget' />
            <Select name='category_id' label='Category' />
            <SubmitButton text={btnText} />
        </form>
    )
}