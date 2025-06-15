// src/components/Sidebar.tsx
import styles from './Sidebar.module.css';
import { FaHome, FaSearch, FaBell, FaUser, FaFeather } from 'react-icons/fa';
import AppIcon from '../components/icons/AppIcon';
import React from 'react';


const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.menu}>
        <AppIcon size={40} className={styles.iconLogo}/>
        <SidebarItem icon={<FaHome />} label="ホーム" />
        <SidebarItem icon={<FaSearch />} label="検索" />
        <SidebarItem icon={<FaBell />} label="通知" />
        <SidebarItem icon={<FaUser />} label="プロフィール" />
        <button className={styles.tweetButton}>
          <FaFeather /> ポストする
        </button>
      </div>
    </aside>
  );
};

type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
};

const SidebarItem = ({ icon, label }: SidebarItemProps): React.JSX.Element => (
  <div className={styles.item}>
    <span className={styles.icon}>{icon}</span>
    <span className={styles.label}>{label}</span>
  </div>
);

export default Sidebar;
