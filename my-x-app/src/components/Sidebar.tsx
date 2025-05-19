// src/components/Sidebar.tsx
import styles from './Sidebar.module.css';
import { FaHome, FaSearch, FaBell, FaUser, FaFeather } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.menu}>
        <SidebarItem icon={<FaHome />} label="ホーム" />
        <SidebarItem icon={<FaSearch />} label="検索" />
        <SidebarItem icon={<FaBell />} label="通知" />
        <SidebarItem icon={<FaUser />} label="プロフィール" />
        <button className={styles.tweetButton}>
          <FaFeather /> 投稿
        </button>
      </div>
    </aside>
  );
};

type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
};

const SidebarItem = ({ icon, label }: SidebarItemProps) => (
  <div className={styles.item}>
    <span className={styles.icon}>{icon}</span>
    <span className={styles.label}>{label}</span>
  </div>
);

export default Sidebar;
