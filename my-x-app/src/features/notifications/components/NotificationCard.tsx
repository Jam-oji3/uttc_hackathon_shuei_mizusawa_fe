// components/NotificationCard.tsx
import React from 'react';
import styles from './NotificationCard.module.css';
import { NotificationData } from '@/types/NotificationData';

type NotificationCardProps = {
  notification: NotificationData;
};

const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
    if (diffInSeconds < 60) return `${diffInSeconds}秒`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}分`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}時間`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}日`;
  };

export const NotificationCard = ({ notification }: NotificationCardProps) => {
  const { type, actor, createdAt } = notification;

  const renderMessage = () => {
    switch (type) {
      case 'like':
        return 'さんがあなたの投稿にいいねしました';
      case 'repost':
        return 'さんがあなたの投稿をリポストしました';
      case 'follow':
        return 'さんがあなたをフォローしました';
      case 'reply':
        return 'さんがあなたに返信しました';
      default:
        return '';
    }
  };

  return (
    <div className={styles.card}>
      <img src={actor.iconUrl} alt="icon" className={styles.icon} />
      <div className={styles.textContainer}>
        <span className={styles.username}>{actor.username}</span>
        <span>{renderMessage()}</span>
        <span className={styles.timestamp}>{formatTimeAgo(createdAt)}</span>
      </div>
    </div>
  );
};
