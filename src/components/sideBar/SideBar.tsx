import ButtonVideoCall from './ButtonVideoCall';
import styles from './SideBar.module.css';

export const SideBar = () => {
  return (
      <section className={styles.sideBar}>
        <ButtonVideoCall text="VIDEO CALL"/>
      </section>
  )
}