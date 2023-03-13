import { ReactComponent as IconLogo } from '../../images/logo_icon.svg';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <IconLogo className={styles.logo} />
      <h1 className={styles.title}>
        <span className={styles.title_uni}>Uni</span>
        <span className={styles.title_board}>BOARD</span> 
      </h1>
    </header>
  );
}