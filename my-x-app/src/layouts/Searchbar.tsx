import React from 'react';
import styles from './Searchbar.module.css';
import { FaSearch } from 'react-icons/fa';
import TrendList from '../features/trend/components/TrendList';
import { useTrends } from '../features/trend/hooks/useTrends';

const Searchbar = () => {
  const {trends, setTrends, loading ,error} = useTrends();

  if (loading) {
    return <div className={styles.loading}>トレンドを読み込み中...</div>;
  }
  if (error) {
    return <div className={styles.error}>トレンドの読み込みに失敗しました: {error}</div>;
  }

  return (
    <aside className={styles.searchbar}>
      <div className={styles.searchBox}>
        <FaSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder="キーワード検索"
          className={styles.searchInput}
        />
      </div>
      <TrendList trends={trends} />
    </aside>
  );
};

export default Searchbar;
