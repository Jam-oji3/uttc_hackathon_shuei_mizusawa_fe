import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import styles from './BackHeader.module.css';

type Props = {
  title?: string;
}

export const BackHeader: React.FC<Props> = ({title}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <header className={styles.header}>
      <button
        onClick={handleBack}
        className={styles.backButton}
        aria-label="戻る"
      >
        <FiArrowLeft size={24} />
      </button>
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
};

export default BackHeader;
