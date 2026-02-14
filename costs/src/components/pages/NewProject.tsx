import { useNavigate } from 'react-router-dom'
import ProjectForm from '../project/ProjectForm'
import styles from './NewProject.module.css'
import { ProjectProps } from '../../interfaces/ProjectProps'

interface NewProjectProps {
    project?: ProjectProps
}

export default function NewProject({ project }: NewProjectProps) {

    const navigate = useNavigate()

    function createPost(project: ProjectProps) {
        // initialize costs and services
        const new_project = {
            ...project,
            spent: 0,
            services: []
        }

        fetch("http://localhost:5000/projects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(new_project)
        }).then(
            response => response.json()
        ).then(
            data => {
                navigate('/projects', { state: { message: "Project created!" } })
            }
        ).catch(
            error => console.error(error)
        )
    }

    return (
        <div className={styles.container}>
            <h1>Create Project</h1>
            <p>Create your project to add services</p>
            <ProjectForm projectData={project ?? {} as ProjectProps} handleSubmit={createPost} btnText="Create project" />
        </div>
    )
}