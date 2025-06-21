import { useEffect, useState } from 'react';
import { useAuthContext } from '../../../contexts/AuthContext';
import { fetchNotifications } from '../api/notifications';
import { NotificationData } from '@/types/NotificationData';

export const useNotifications = (userId: string) => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { isLoading: isAuthLoading, idToken } = useAuthContext();

  useEffect(() => {
    // 認証情報の読み込みが完了してから実行
    if (isAuthLoading || !userId || !idToken) return;

    const loadNotif = async () => {
      try {
        setLoading(true);
        const json = await fetchNotifications(userId, 30, idToken);
        if (!json) {
          throw new Error('No notifications found');
        }
        setNotifications(json.notifications);
        setError(null);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadNotif();
  }, [userId, isAuthLoading, idToken]);

  return { notifications, loading, error };
};
