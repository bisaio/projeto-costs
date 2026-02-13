import { useLocation } from "react-router-dom";
import LinkButton from "../layout/LinkButton";
import Message from "../layout/Message";
import styles from './Projects.module.css'
import Container from "../layout/Container";
import ProjectCard from "../project/ProjectCard";
import { useEffect, useState } from "react";
import { ProjectProps } from "../../interfaces/ProjectProps";
import Loading from "../layout/Loading";

export default function Projects() {

    const [projects, setProjects] = useState<ProjectProps[]>([]);
    const [removeLoading, setRemoveLoading] = useState(false);
    const [projectMessage, setProjectMessage] = useState("")

    useEffect(() => {
        fetch("http://localhost:5000/projects", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                setProjects(data)
                setRemoveLoading(true)
            })
            .catch(error => console.error(error))
    }, [])

    function removeProject(id: number) {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(() => {
                setProjects(projects.filter(project => project.id !== id))
                setProjectMessage("Project removed!")
            })
            .catch(error => console.error(error))
    }

    const location = useLocation();
    let message = ''
    if (location.state) message = location.state.message

    return (
        < div className={styles.container} >
            <div className={styles.title_container}>
                <h1>My projects</h1>
                <LinkButton link_to='/newproject' text='Create New Project' />
            </div>
            {message && <Message type="success" text={message} />}
            {projectMessage && <Message type="success" text={projectMessage} />}
            <Container customClass="start">
                {projects.length > 0 && projects.map(
                    project =>
                        <ProjectCard
                            id={project.id}
                            key={project.id}
                            name={project.name}
                            budget={project.budget}
                            category={project.category.name}
                            handleRemove={removeProject} />
                )}
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && (
                    <p>You don't have any projects yet...</p>
                )}
            </Container>
        </div >
    )
}