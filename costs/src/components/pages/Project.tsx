import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { ProjectProps } from '../../interfaces/ProjectProps'
import { ServiceProps } from '../../interfaces/ServiceProps'
import Container from '../layout/Container'
import Loading from '../layout/Loading'
import Message from '../layout/Message'
import ProjectForm from '../project/ProjectForm'
import ServiceCard from '../service/ServiceCard'
import ServiceForm from '../service/ServiceForm'
import styles from './Project.module.css'

export default function Project() {
    const { id } = useParams()

    const [project, setProject] = useState<ProjectProps>()
    const [services, setServices] = useState<ServiceProps[] | []>([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState<{ id: number, type: string, text: string } | null>(null)

    useEffect(() => {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json())
            .then(data => {
                setProject(data)
                setServices(data.services);
            })
            .catch(error => console.error(error))
    }, [id])

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }

    function createService(project: ProjectProps) {
        const last_service = project.services.at(-1);

        if (!last_service) return false;

        last_service.id = uuidv4()

        const last_service_cost = Number(last_service.cost);
        const new_cost = project.spent + last_service_cost

        if (new_cost > project.budget) {
            setMessage({ id: Date.now(), type: "error", text: "Budget has been exceeded, please check the service cost." })
            project.services.pop()
            return false;
        }

        project.spent = new_cost;

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        }).then(response => response.json())
            .then(data => {
                setProject(data)
                setShowServiceForm(false)
            })
            .catch(error => console.error(error))
    }

    function editPost(project: ProjectProps) {
        if (project.budget < project.spent) {
            setMessage({ id: Date.now(), type: "error", text: "Budget can't be lower than what was spent in the project." })
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
                setMessage({ id: Date.now(), type: "success", text: "Project updated." })
            })
            .catch(error => console.error(error))
    }

    function removeService(id: string, cost: number) {
        const services_updated = project?.services.filter(service => service.id !== id)
        const project_updated = project

        if (project_updated && services_updated) {
            project_updated.services = services_updated
            project_updated.spent = project_updated.spent - Number(cost)

            fetch(`http://localhost:5000/projects/${project_updated.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(project_updated)
            }).then(response => response.json())
                .then(() => {
                    setProject(project_updated)
                    setServices(services_updated)
                    setMessage({ id: Date.now(), type: "success", text: "Service removed." })
                })
                .catch(error => console.log(error))
        }
    }

    return (
        <>
            {project ? (
                <div className={styles.details}>
                    <Container customClass='column'>
                        {message && <Message key={message.id} type={message.type} text={message.text} />}
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
                                {showServiceForm && (
                                    <ServiceForm handleSubmit={createService} btnText='Add service' projectData={project} />
                                )}
                            </div>
                        </div>
                        <h2>Services</h2>
                        <Container customClass="start">
                            {services.length > 0 && (services.map(service => <ServiceCard id={service.id} key={service.id} name={service.name} description={service.description} cost={service.cost} handleRemove={removeService} />))}
                            {services.length === 0 && (<p>This project has no services.</p>)}
                        </Container>
                    </Container>
                </div>
            ) : (
                <Loading />
            )}
        </>
    )
}