import { ReactComponent as IconLogo } from '../../images/logo_icon.svg';
import ButtonUtils from '../utils/ButtonUtils';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header_title}>
        <IconLogo className={styles.logo} />
        <h1 className={styles.title}>
          <span className={styles.title_uni}>Uni</span>
          <span className={styles.title_board}>BOARD</span>
        </h1>
      </div>
      <div className={styles.nav}>
        <ButtonUtils text="LOGIN" />
        <ButtonUtils text="REGISTER" />
      </div>
    </header>
  );
}