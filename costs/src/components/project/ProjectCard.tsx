import { BsFillTrashFill, BsPencilFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import styles from './ProjectCard.module.css'

interface ProjectCardProps {
    id: number,
    name: string,
    budget: number,
    category: string,
    handleRemove?: (id: number) => void
}

export default function ProjectCard({ id, name, budget, category, handleRemove }: ProjectCardProps) {

    const remove = (event: React.SyntheticEvent) => {
        event.preventDefault();
        handleRemove && handleRemove(id)
    }

    return (
        <div className={styles.card}>
            <h4>{name}</h4>
            <p><span>Budget: </span>${budget}</p>
            <p className={styles.category_text}><span className={`${styles[category.toLowerCase()]}`}></span>{category}</p>
            <div className={styles.card_actions}>
                <Link to={`/project/${id}`}><BsPencilFill color='#1383ce'/>Edit</Link>
                <button onClick={remove}><BsFillTrashFill color='#C42D2D'/>Remove</button>
            </div>
        </div>
    )
}