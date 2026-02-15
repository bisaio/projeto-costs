import { BsFillTrashFill } from 'react-icons/bs'
import styles from '../project/ProjectCard.module.css'

interface ServiceCardProps {
    id: string,
    name: string,
    description: string,
    cost: number,
    handleRemove: (id: number) => void
}

export default function ServiceCard({ id, name, description, cost, handleRemove }: ServiceCardProps) {
    function remove() {

    }

    return (
        <div className={styles.card}>
            <h4>{name}</h4>
            <p>
                <span>Description:</span> {description}
            </p>
            <p>
                <span>Cost:</span> ${cost}
            </p>
            <div className={styles.card_actions}>
                <button onClick={remove}>
                    <BsFillTrashFill color='red'/> Remove
                </button>
            </div>
        </div>
    )
}