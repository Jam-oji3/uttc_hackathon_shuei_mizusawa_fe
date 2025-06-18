import React from 'react';
import styles from './Profile.module.css';
import { UserProfile } from '@/types/UserData';

type UserProfileProps = {
  profile: UserProfile;
};

const Profile: React.FC<UserProfileProps> = ({
  profile: prof
}) => {
  return (
    <div className={styles.profileContainer}>
      <img src={prof.iconUrl} alt={`${prof.displayName}のアイコン`} className={styles.icon} />
      <div className={styles.info}>
        <h2>{prof.displayName}</h2>
        <p className={styles.username}>@{prof.username}</p>
        <p className={styles.bio}>{prof.bio}</p>
        <div className={styles.follows}>
          <span><strong>{prof.stats.followingCount}</strong> フォロー中</span>
          <span><strong>{prof.stats.followerCount}</strong> フォロワー</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
