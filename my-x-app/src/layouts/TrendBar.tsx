import React from 'react';
import styles from './TrendBar.module.css';
import TrendList from '../features/trend/components/TrendList';
import { useTrends } from '../features/trend/hooks/useTrends';

const TrendBar = () => {
  const {trends, loading ,error} = useTrends();

  return (
    <aside className={styles.trendbar}>
      {loading && <div className={styles.loading}>トレンドを読み込み中...</div>}
      {error && <div className={styles.error}>トレンドの読み込みに失敗しました: {error}</div>}
      {/* ロードが完了し、エラーがない場合にのみTrendListを表示 */}
      {!loading && !error && trends && <TrendList trends={trends} />}
    </aside>
  );
};

export default TrendBar;
