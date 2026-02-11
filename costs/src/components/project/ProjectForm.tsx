import { useEffect, useState } from 'react'
import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import styles from './ProjectForm.module.css'

interface ProjectFormProps {
    btnText: string
}

export default function ProjectForm({ btnText }: ProjectFormProps) {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/categories", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(
            response => response.json()
        ).then(
            data => {
                setCategories(data)
            }
        ).catch(error => console.error(error))
    }, [])

    return (
        <form className={styles.form}>
            <Input type='text' label='Name' name='name' placeholder='Insert project name' />
            <Input type='number' label='Budget' name='budget' placeholder='Insert total budget' />
            <Select name='category_id' label='Category' options={categories} />
            <SubmitButton text={btnText} />
        </form>
    )
}