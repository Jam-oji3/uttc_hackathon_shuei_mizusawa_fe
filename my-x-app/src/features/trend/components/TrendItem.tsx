// components/TrendItem.tsx
import React from 'react';
import styles from './TrendItem.module.css';
import { TrendData } from '@/types/TrendData';

type TrendItemProps = {
  trend: TrendData;
  onClick?: (trend: TrendData) => void;
};

const TrendItem: React.FC<TrendItemProps> = ({ trend, onClick }) => {
  return (
    <li
      className={styles.trendItem}
      onClick={onClick ? () => onClick(trend) : undefined}
    >
      <div className={styles.trendTitle}>{trend.word}</div>
      <div className={styles.trendTweets}>{trend.count}</div>
    </li>
  );
};

export default TrendItem;
