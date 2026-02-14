import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ProjectProps } from '../../interfaces/ProjectProps'
import Container from '../layout/Container'
import Loading from '../layout/Loading'
import styles from './Project.module.css'

export default function Project() {
    const { id } = useParams()

    const [project, setProject] = useState<ProjectProps>()
    const [showProjectForm, setShowProjectForm] = useState(false)

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

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    return (
        <>
            {project ? (
                <div className={styles.details}>
                    <Container customClass='column'>
                        <div className={styles.details_container}>
                            <h1>{project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>{!showProjectForm ? "Edit project" : "Close"}</button>
                            {!showProjectForm ? (
                                <div className={styles.info}>
                                    <p>
                                        <span>Budget:</span>  ${project.budget}
                                    </p>
                                    <p>
                                        <span>Spent:</span>  ${project.spent ? project.spent : 0}
                                    </p>
                                    <p>
                                        <span>Category:</span> {project.category.name}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.info}>
                                    <p>Form</p>
                                </div>
                            )}
                        </div>
                    </Container>
                </div>
            ) : (
                <Loading />
            )}
        </>
    )
}