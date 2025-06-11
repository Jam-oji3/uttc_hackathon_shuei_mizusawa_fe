import styles from './Searchbar.module.css';
import React from 'react';
import { FaSearch } from 'react-icons/fa';

const Searchbar = () => {
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
      <div className={styles.trends}>
        <h3 className={styles.trendsTitle}>トレンド</h3>
        <ul className={styles.trendList}>
          <TrendItem title="DELTARUNE" tweets="12.3万件のポスト" />
          <TrendItem title="マリオカートワールド" tweets="6.7万件のポスト" />
          <TrendItem title="進振り" tweets="3.1万件のポスト" />
        </ul>
      </div>
    </aside>
  );
};

type TrendItemProps = {
  title: string;
  tweets: string;
};

const TrendItem = ({ title, tweets }: TrendItemProps) => (
  <li className={styles.trendItem}>
    <div className={styles.trendTitle}>{title}</div>
    <div className={styles.trendTweets}>{tweets}</div>
  </li>
);

export default Searchbar;
