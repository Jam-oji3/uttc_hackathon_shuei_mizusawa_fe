import React from 'react';
import styles from './Profile.module.css';
import { UserData } from '@/types/UserData';

type UserProfileProps = {
  user: UserData;
  followersCount: number;
  followingCount: number;
};

const Profile: React.FC<UserProfileProps> = ({
  user,
  followersCount,
  followingCount,
}) => {
  return (
    <div className={styles.profileContainer}>
      <img src={user.iconUrl} alt={`${user.displayName}のアイコン`} className={styles.icon} />
      <div className={styles.info}>
        <h2>{user.displayName}</h2>
        <p className={styles.username}>@{user.username}</p>
        <p className={styles.bio}>{user.bio}</p>
        <div className={styles.follows}>
          <span><strong>{followingCount}</strong> フォロー中</span>
          <span><strong>{followersCount}</strong> フォロワー</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
