import styles from './SearchBox.module.css';
import React from 'react';

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export const SearchBox = ({ value, onChange, onSubmit }: Props) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="キーワードで検索"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button type="submit" className={styles.searchButton}>
        検索
      </button>
    </form>
  );
};
