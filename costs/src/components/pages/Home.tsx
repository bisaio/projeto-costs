import styles from './Home.module.css'
import savings from '../../img/savings.svg'
import LinkButton from '../layout/LinkButton'

export default function Home() {
    return (
        <section className={styles.container}>
            <h1>Welcome to <span>Costs</span></h1>
            <p>Start managing your projects right now!</p>
            <LinkButton link_to='/newproject' text='Create New Project'/>
            <img src={savings} alt="savings" />
        </section>
    )
}