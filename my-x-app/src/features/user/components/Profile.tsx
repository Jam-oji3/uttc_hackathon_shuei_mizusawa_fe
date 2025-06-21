import React from 'react';
import DefaultUserIcon from '../../../components/icons/DefaultUserIcon';
import styles from './Profile.module.css';
import { UserProfile } from '@/types/UserData';

type UserProfileProps = {
  profile: UserProfile;
  viewerId: string;
  isFollowing?: boolean;
  onFollowToggle: () => void;
};

const Profile: React.FC<UserProfileProps> = ({
  profile: prof,
  viewerId,
  isFollowing = false,
  onFollowToggle,
}) => {
  return (
    <div className={styles.profileContainer}>
      {
        prof.iconUrl ?
        <img src={prof.iconUrl} alt={`${prof.displayName}のアイコン`} className={styles.icon} /> :
        <DefaultUserIcon size={48} alt={`${prof.displayName}のアイコン`} className={styles.icon} />
      }
      <div className={styles.info}>
        <h2>{prof.displayName}</h2>
        <p className={styles.username}>@{prof.username}</p>
        <p className={styles.bio}>{prof.bio}</p>
        <div className={styles.follows}>
          <span><strong>{prof.stats.followingCount}</strong> フォロー中</span>
          <span><strong>{prof.stats.followerCount}</strong> フォロワー</span>
        </div>
        {viewerId !== prof.id ?
        <button
          className={`${styles.followButton} ${isFollowing ? styles.following : ''}`}
          onClick={onFollowToggle}
          type="button"
        >
          {isFollowing ? 'フォロー解除' : 'フォローする'}
        </button>: null}
      </div>
    </div>
  );
};

export default Profile;
