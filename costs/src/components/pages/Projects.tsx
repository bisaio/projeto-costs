import { useLocation } from "react-router-dom";
import LinkButton from "../layout/LinkButton";
import Message from "../layout/Message";
import styles from './Projects.module.css'
import Container from "../layout/Container";

export default function Projects() {
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
                <p>projetos</p>
            </Container>
        </div>
    )
}