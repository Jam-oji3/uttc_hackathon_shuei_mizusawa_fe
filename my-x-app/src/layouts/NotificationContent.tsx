'use client';

import { useAuthContext } from '../contexts/AuthContext';
import { useNotifications } from '../features/notifications/hooks/useNotifications';
import { NotificationList } from '../features/notifications/components/NotificationList';
import styles from './NotificationContent.module.css';

export const NotificationContent = () => {
  const { user, isLoading: isAuthLoading } = useAuthContext();
  const { notifications, loading, error } = useNotifications(user?.id ?? '');

  let content;

  if (isAuthLoading || loading) {
    content = <div className={styles.loading}>読み込み中...</div>;
  } else if (!user) {
    content = <div className={styles.error}>ログインしていません。</div>;
  } else if (error) {
    content = <div className={styles.error}>通知の取得に失敗しました</div>;
  } else if (!notifications) {
    content = <div className={styles.error}>通知がありません。</div>;
  } else {
    content = <NotificationList notifications={notifications} />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.notificationContent}>
        <h2 className={styles.title}>通知</h2>
        <div className={styles.scrollArea}>{content}</div>
      </div>
    </div>
  );
};

export default NotificationContent;
