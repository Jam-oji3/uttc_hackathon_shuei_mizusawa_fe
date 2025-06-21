'use client';

import { useAuthContext } from '../contexts/AuthContext';
import { useNotifications } from '../features/notifications/hooks/useNotifications';
import { NotificationList } from '../features/notifications/components/NotificationList';
import { useNotificationNavigation } from '../features/notifications/hooks/useNotificationNavigation';
import styles from './NotificationContent.module.css';

export const NotificationContent = () => {
  const { user, isLoading: isAuthLoading } = useAuthContext();
  const { notifications, loading, error } = useNotifications(user?.id ?? '');
  const { handleClick } = useNotificationNavigation();

  let content;

  if (isAuthLoading || loading) {
    content = <div className={styles.loading}>読み込み中...</div>;
  } else if (!user) {
    content = <div className={styles.error}>ログインしていません。</div>;
  } else if (error) {
    content = <div className={styles.error}>通知の取得に失敗しました</div>;
  } else if (!notifications || notifications.length === 0) {
    content = <div className={styles.error}>通知がありません。</div>;
  } else {
    content = (
      <NotificationList
        notifications={notifications}
        onClick={handleClick} // クリック時のコールバックを渡す
      />
    );
  }

  return (
    <div className={styles.notificationContent}>
    <h2 className={styles.title}>通知</h2>
    <div className={styles.scrollArea}>{content}</div>
    </div>
  );
};

export default NotificationContent;
