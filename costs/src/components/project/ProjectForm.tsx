import React, { useEffect, useState } from 'react'
import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import styles from './ProjectForm.module.css'
import { ProjectProps } from '../../interfaces/ProjectProps'

interface ProjectFormProps {
    handleSubmit: (project: ProjectProps) => void,
    projectData: ProjectProps
    btnText: string,
}

export default function ProjectForm({ handleSubmit, projectData, btnText }: ProjectFormProps) {

    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState<ProjectProps>(projectData || {} as ProjectProps)

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

    const submit = (event: React.SyntheticEvent) => {
        event.preventDefault()
        handleSubmit(project)
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value, type } = event.target

        setProject({
            ...project,
            [name]: type === "number" ? Number(value) : value
        })
    }

    function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
        setProject({
            ...project, category: {
                id: Number(event.target.value),
                name: event.target.options[event.target.selectedIndex].text
            }
        })
    }

    return (
        <form className={styles.form} onSubmit={submit}>
            <Input type='text' label='Name' name='name' placeholder='Insert project name' handleOnChange={handleChange} value={project.name ?? ''} />
            <Input type='number' label='Budget' name='budget' placeholder='Insert total budget' handleOnChange={handleChange} value={project.budget ?? ''} />
            <Select name='category_id' label='Category' options={categories} handleOnChange={handleSelect} value={project.category ? project.category.id : ''} />
            <SubmitButton text={btnText} />
        </form>
    )
}