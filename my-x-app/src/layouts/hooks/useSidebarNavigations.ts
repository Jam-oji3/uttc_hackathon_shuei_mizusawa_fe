// src/hooks/useSidebarNavigation.ts
import { useAuthContext } from '../../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

export const useSidebarNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoading} = useAuthContext();
    if (isLoading || !user){
        return {
        items: [],
        handleClick: () => {},
        isActive: () => false,
        };
    }
  const items = [
    { label: 'ホーム', path: '/home', iconKey: 'home' },
    { label: '検索', path: '/search', iconKey: 'search' },
    { label: '通知', path: '/notifications', iconKey: 'bell' },
    { label: 'プロフィール', path: `/users/${user.username}`, iconKey: 'user' },
  ];

  const handleClick = (path: string) => {
    if (location.pathname !== path) {
      navigate(path);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return {
    items,
    handleClick,
    isActive,
  };
};
