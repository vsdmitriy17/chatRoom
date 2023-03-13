import styles from './Chat.module.css';

export const Chat = () => {
  return (
    <section className={styles.chat}>
      <textarea className={styles.chat_text}></textarea>
      <form className={styles.chat_form}>
        <textarea className={styles.chat_form_text}></textarea>
        <button className={styles.chat_button}>SEND</button>
      </form>
    </section>
  )
}