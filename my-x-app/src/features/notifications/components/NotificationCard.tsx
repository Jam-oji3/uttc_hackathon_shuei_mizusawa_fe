// components/NotificationCard.tsx
import React from 'react';
import styles from './NotificationCard.module.css';
import { NotificationData } from '@/types/NotificationData';
import { 
  FaHeart,    // like
  FaRetweet,  // repost
  FaUserPlus, // follow
  FaReply    // reply
} from 'react-icons/fa';

type NotificationCardProps = {
  notification: NotificationData;
  onClick: (notification: NotificationData) => void;
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

const getMessage = (type: NotificationData['type']) => {
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

const getIcon = (type: NotificationData['type']) => {
  switch (type) {
    case 'like':
      return <FaHeart className={styles.iconType} color="#f91880" />;
    case 'repost':
      return <FaRetweet className={styles.iconType} color="#00ba7c" />;
    case 'follow':
      return <FaUserPlus className={styles.iconType} color="#007bff" />;
    case 'reply':
      return <FaReply className={styles.iconType} color="#ff9900" />;
    default:
      return null;
  }
};

// NotificationCard.tsx（重要部分抜粋）

export const NotificationCard: React.FC<NotificationCardProps> = ({ notification, onClick }) => {
    const { actor, createdAt, type } = notification;
  
    return (
      <div className={styles.card} onClick={() => onClick(notification)}>
        <div className={styles.iconsContainer}>
          {getIcon(type)}
          <img src={actor.iconUrl} alt="icon" className={styles.userIcon} />
        </div>
        <div className={styles.textContainer}>
          <span className={styles.username}>{actor.username}</span>
          <span>{getMessage(type)}</span>
          <span className={styles.timestamp}>{formatTimeAgo(createdAt)}</span>
        </div>
      </div>
    );
  };
  
