import styles from './Tabs.module.css';

type TabProps = {
  activeTab: 'recommend' | 'following';
  setActiveTab: (tab: 'recommend' | 'following') => void;
};

export const Tabs = ({ activeTab, setActiveTab }: TabProps) => {
  return (
    <div className={styles.tabContainer}>
      <button
        className={`${styles.tabButton} ${activeTab === 'recommend' ? styles.active : ''}`}
        onClick={() => setActiveTab('recommend')}
      >
        おすすめ
        {activeTab === 'recommend' && <div className={styles.activeIndicator} />}
      </button>
      <button
        className={`${styles.tabButton} ${activeTab === 'following' ? styles.active : ''}`}
        onClick={() => setActiveTab('following')}
      >
        フォロー中
        {activeTab === 'following' && <div className={styles.activeIndicator} />}
      </button>
    </div>
  );
};