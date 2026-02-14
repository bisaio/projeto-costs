import React, { useState } from 'react'
import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'
import styles from '../project/ProjectForm.module.css'
import { ProjectProps } from '../../interfaces/ProjectProps';
import { ServiceProps } from '../../interfaces/ServiceProps';

interface ServiceFormProps {
    btnText: string,
    handleSubmit: (project: ProjectProps) => void,
    projectData: ProjectProps
}

export default function ServiceForm({ btnText, handleSubmit, projectData }: ServiceFormProps) {

    const [service, setService] = useState<ServiceProps>({} as ServiceProps);

    function submit(event: React.SyntheticEvent) {
        event.preventDefault();
        projectData.services.push(service);
        handleSubmit(projectData);
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setService({ ...service, [event.target.name]: event.target.value })
    }

    return (
        <form className={styles.form} onSubmit={submit}>
            <Input type='text' label='Name' name='name' placeholder='Insert service name' handleOnChange={handleChange} />
            <Input type='text' label='Description' name='description' placeholder='Describe the service' handleOnChange={handleChange} />
            <Input type='number' label='Cost' name='cost' placeholder='Insert service cost' handleOnChange={handleChange} />
            <SubmitButton text={btnText}/>
        </form>
    )
}