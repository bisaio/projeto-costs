import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ProjectProps } from '../../interfaces/ProjectProps'
import Container from '../layout/Container'
import Loading from '../layout/Loading'
import styles from './Project.module.css'
import ProjectForm from '../project/ProjectForm'
import Message from '../layout/Message'

export default function Project() {
    const { id } = useParams()

    const [project, setProject] = useState<ProjectProps>()
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState("")
    const [messageType, setMessageType] = useState("")

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

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }

    function editPost(project: ProjectProps) {
        setMessage('')

        if (project.budget < project.spent) {
            setMessageType("error")
            setMessage("Budget can't be lower than what was spent in the project.")
            return false;
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        }).then(response => response.json())
            .then(data => {
                setProject(data);
                setShowProjectForm(false);
                setMessageType("success");
                setMessage("Project updated.");
            })
            .catch(error => console.error(error))
    }

    return (
        <>
            {project ? (
                <div className={styles.details}>
                    <Container customClass='column'>
                        {message && <Message type={messageType} text={message} />}
                        <div className={styles.details_container}>
                            <h1>{project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>{!showProjectForm ? "Edit project" : "Close"}</button>
                            {!showProjectForm ? (
                                <div className={styles.info}>
                                    <p>
                                        <span>Budget:</span> ${project.budget}
                                    </p>
                                    <p>
                                        <span>Spent:</span> ${project.spent}
                                    </p>
                                    <p>
                                        <span>Category:</span> {project.category.name}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.info}>
                                    <ProjectForm handleSubmit={editPost} btnText='Edit' projectData={project} />
                                </div>
                            )}
                        </div>
                        <div className={styles.service_form_container}>
                            <h2>Add a service</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>{!showServiceForm ? "Add service" : "Close"}</button>
                            <div className={styles.info}>
                                {showServiceForm && <div>Form</div>}
                            </div>
                        </div>
                        <h2>Services</h2>
                        <Container customClass="start">
                            <p>services</p>
                        </Container>
                    </Container>
                </div>
            ) : (
                <Loading />
            )}
        </>
    )
}