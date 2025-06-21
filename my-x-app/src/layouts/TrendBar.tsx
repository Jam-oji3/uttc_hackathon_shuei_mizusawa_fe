import React from 'react';
import styles from './TrendBar.module.css';
import TrendList from '../features/trend/components/TrendList';
import { useTrends } from '../features/trend/hooks/useTrends';

const Searchbar = () => {
  const {trends, loading ,error} = useTrends();

  if (loading) {
    return <div className={styles.loading}>トレンドを読み込み中...</div>;
  }
  if (error) {
    return <div className={styles.error}>トレンドの読み込みに失敗しました: {error}</div>;
  }

  return (
    <aside className={styles.trendbar}>
      <TrendList trends={trends} />
    </aside>
  );
};

export default Searchbar;
