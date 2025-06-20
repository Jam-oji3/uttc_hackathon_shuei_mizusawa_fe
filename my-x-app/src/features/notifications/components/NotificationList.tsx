import React from 'react';
import { NotificationCard } from './NotificationCard';
import { NotificationData } from '../../../types/NotificationData';

type Props = {
  notifications: NotificationData[];
};

export const NotificationList = ({ notifications }: Props) => {
  return (
    <>
      {notifications.length === 0 ? (
        <p>通知はありません</p>
      ) : (
        notifications.map((n, i) => (
          <NotificationCard key={i} notification={n} />
        ))
      )}
    </>
  );
};
