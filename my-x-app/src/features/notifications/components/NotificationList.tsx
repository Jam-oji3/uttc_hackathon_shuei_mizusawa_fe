import React from 'react';
import { NotificationCard } from './NotificationCard';
import { NotificationData } from '../../../types/NotificationData';
import styles from './NotificationList.module.css';

type Props = {
  notifications: NotificationData[];
};

export const NotificationList = ({ notifications }: Props) => {
  return (
    <div className={styles.notifList}>
      {notifications.length === 0 ? (
        <p>通知はありません</p>
      ) : (
        notifications.map((n, i) => (
          <NotificationCard key={i} notification={n} />
        ))
      )}
    </div>
    
  );
};
