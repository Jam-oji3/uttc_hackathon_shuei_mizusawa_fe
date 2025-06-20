'use client';

import { useAuthContext } from '../contexts/AuthContext';
import { useNotifications } from '../features/notifications/hooks/useNotifications';
import { NotificationList} from '../features/notifications/components/NotificationList';
import styles from './NotificationContent.module.css';

export const NotificationContent = () => {
  const { user, isLoading: isAuthLoading } = useAuthContext();
  const { notifications, loading, error } = useNotifications(user?.id ?? '');

  if (isAuthLoading || loading) {
    return <div className={styles.loading}>読み込み中...</div>;
  }

  if (!user) {
    return <div className={styles.error}>ログインしていません。</div>;
  }

  if (error) {
    return <div className={styles.error}>通知の取得に失敗しました: {error}</div>;
  }
  return (
    <div className={styles.notificationContent}>
      <h2 className={styles.title}>通知</h2>
      <div className={styles.scrollArea}>
      <NotificationList notifications={notifications} />
      </div>
      
    </div>
  )
};
