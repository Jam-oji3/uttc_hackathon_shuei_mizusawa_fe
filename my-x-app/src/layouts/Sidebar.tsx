import styles from './Sidebar.module.css';
import { FaHome, FaSearch, FaBell, FaUser, FaFeather, FaSignOutAlt } from 'react-icons/fa';
import AppIcon from '../components/icons/AppIcon';
import React from 'react';
import { useSidebarNavigation } from './hooks/useSidebarNavigations';
import { useAuthContext } from '../contexts/AuthContext';

const Sidebar = () => {
  const { items, handleClick, isActive } = useSidebarNavigation();
  const { signOutUser } = useAuthContext();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.menu}>
        <AppIcon size={40} className={styles.iconLogo} />
        {items.map((item) => (
          <SidebarItem
            key={item.label}
            icon={getIcon(item.iconKey)}
            label={item.label}
            onClick={() => handleClick(item.path)}
            active={isActive(item.path)}
          />
        ))}
      </div>
    </aside>
  );
};

// Faアイコンの対応
const getIcon = (key: string): React.ReactElement => {
  switch (key) {
    case 'home': return <FaHome />;
    case 'search': return <FaSearch />;
    case 'bell': return <FaBell />;
    case 'user': return <FaUser />;
    case 'signOut': return <FaSignOutAlt/>;
    default: return <FaFeather />;
  }
};

// SidebarItem を拡張
type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
};

const SidebarItem = ({ icon, label, onClick, active }: SidebarItemProps): React.JSX.Element => (
  <div
    className={`${styles.item} ${active ? styles.active : ''}`}
    onClick={onClick}
  >
    <span className={styles.icon}>{icon}</span>
    <span className={styles.label}>{label}</span>
  </div>
);

export default Sidebar;
