import ProjectForm from '../project/ProjectForm'
import styles from './NewProject.module.css'

export default function NewProject() {
    return (
        <div className={styles.container}>
            <h1>Create Project</h1>
            <p>Create your project to add services</p>
            <ProjectForm />
        </div>
    )
}