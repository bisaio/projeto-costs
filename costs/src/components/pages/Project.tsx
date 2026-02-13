import { useEffect, useState } from 'react'
import { ProjectProps } from '../../interfaces/ProjectProps'
import styles from './Project.module.css'
import { useParams } from 'react-router-dom'

export default function Project() {
    const { id } = useParams()

    const [project, setProject] = useState<ProjectProps>()

    useEffect(() => {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json())
            .then(data => setProject(data))
            .catch(error => console.error(error))
    }, [id])

    return (
        <p>{project?.name}</p>
    )
}