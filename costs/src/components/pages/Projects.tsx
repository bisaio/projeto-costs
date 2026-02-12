import { useLocation } from "react-router-dom";
import LinkButton from "../layout/LinkButton";
import Message from "../layout/Message";
import styles from './Projects.module.css'
import Container from "../layout/Container";
import ProjectCard from "../project/ProjectCard";
import { useEffect, useState } from "react";
import { ProjectProps } from "../../interfaces/ProjectProps";

export default function Projects() {

    const [projects, setProjects] = useState<ProjectProps[]>([]);

    useEffect(() => {
        fetch("http://localhost:5000/projects", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => setProjects(data))
            .catch(error => console.error(error))
    }, [])

    const location = useLocation();
    let message = ''
    if (location.state) message = location.state.message

    return (
        <div className={styles.container}>
            <div className={styles.title_container}>
                <h1>My projects</h1>
                <LinkButton link_to='/newproject' text='Create New Project' />
            </div>
            {message && <Message type="success" text={message} />}
            <Container customClass="start">
                {projects.length > 0 && projects.map(
                    project =>
                        <ProjectCard
                            id={project.id}
                            key={project.id}
                            name={project.name}
                            budget={project.budget}
                            category={project.category.name}
                            handleRemove={() => { }} />
                )}
            </Container>
        </div>
    )
}