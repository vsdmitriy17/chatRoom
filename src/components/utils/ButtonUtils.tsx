import React from 'react';

import styles from './ButtonUtils.module.css';

interface IProps {
  text?: string
  children?: React.ReactNode
  onClick?: () => void
  handleClick?: () => void
};

const ButtonUtils: React.FunctionComponent<IProps> = ({text, children, handleClick}) => {
  return (
    <button onClick={handleClick} className={styles.button}>{text} {children}</button>
  )
}

export default ButtonUtils;