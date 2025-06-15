'use client';

import { useParams } from 'react-router-dom';
import { useUserProfile } from '../features/profile/hooks/useUserProfile';
import { PostList } from '../components/post/PostList';
import BackHeader from '../components/header/BackHeader';
import Profile from '../features/profile/components/Profile';
import styles from './ProfileContent.module.css';

export const ProfileContent = () => {
  const { username } = useParams<{ username: string }>();
  const { profile, loading } = useUserProfile(username ?? '')

  if (loading) {
    return <div className={styles.loading}>読み込み中...</div>;
  }

  if (!profile) {
    return <div className={styles.error}>プロフィールが見つかりませんでした。</div>;
  }

  return (
    <div className={styles.profileContent}>
      <BackHeader title={profile.user.displayName}/>
      <Profile user={profile.user} followersCount={profile.followersCount} followingCount={profile.followingCount} />
      <PostList posts={[]} />
    </div>
  );
};
