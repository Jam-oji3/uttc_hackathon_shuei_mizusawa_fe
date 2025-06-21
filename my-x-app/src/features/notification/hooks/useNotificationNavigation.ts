// hooks/useNotificationNavigation.ts
import { useNavigate } from 'react-router-dom';
import { NotificationData } from '@/types/NotificationData';

export const useNotificationNavigation = () => {
  const navigate = useNavigate();

  const handleClick = (notification: NotificationData) => {
    const { type, targetId, actor } = notification;

    switch (type) {
      case 'like':
      case 'repost':
      case 'reply':
        if (targetId) {
          navigate(`/posts/${targetId}`);
        }
        break;
      case 'follow':
        navigate(`/users/${actor.username}`);
        break;
      default:
        console.warn('Unknown notification type:', type);
        break;
    }
  };

  return { handleClick };
};
