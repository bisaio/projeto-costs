import { useLocation } from "react-router-dom";
import LinkButton from "../layout/LinkButton";
import Message from "../layout/Message";

export default function Projects() {
    const location = useLocation();
    let message = ''
    if (location.state) message = location.state.message

    return (
        <div>
            <h1>My projects</h1>
            {message && <Message type="success" text={message} />}
            <LinkButton link_to='/newproject' text='Create New Project' />
        </div>
    )
}