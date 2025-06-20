// components/TrendList.tsx
import React from 'react';
import styles from './TrendList.module.css'; // 必要に応じてTrendList.module.cssに分離してもOK
import { TrendData } from '@/types/TrendData';

type TrendListProps = {
    trends: TrendData[] | null;
    };
    

const TrendItem = (trend: TrendData) => (
  <li className={styles.trendItem}>
    <div className={styles.trendTitle}>{trend.word}</div>
    <div className={styles.trendTweets}>{trend.count}</div>
  </li>
);

const TrendList = ({ trends }: TrendListProps) => {
  return (
    <div className={styles.trends}>
      <h3 className={styles.trendsTitle}>トレンド</h3>
      {!trends ? <div className={styles.trendList}>現在トレンドはありません</div> :
      <ul className={styles.trendList}>
      {trends.map((trend) => (
        <TrendItem key={trend.word} {...trend} />
      ))}
    </ul>}
      
    </div>
  );
};

export default TrendList;
