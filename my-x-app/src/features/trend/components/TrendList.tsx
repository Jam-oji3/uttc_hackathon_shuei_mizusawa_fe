// components/TrendList.tsx
import React from 'react';
import styles from './TrendList.module.css';
import { TrendData } from '@/types/TrendData';
import TrendItem from './TrendItem';

type TrendListProps = {
  trends: TrendData[] | null;
  onClick?: (trend: TrendData) => void;
};

const TrendList: React.FC<TrendListProps> = ({ trends, onClick }) => {
  return (
    <div className={styles.trends}>
      <h3 className={styles.trendsTitle}>トレンド</h3>
      {!trends ? (
        <div className={styles.trendList}>現在トレンドはありません</div>
      ) : (
        <ul className={styles.trendList}>
          {trends.map((trend) => (
            <TrendItem key={trend.word} trend={trend} onClick={onClick} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TrendList;
