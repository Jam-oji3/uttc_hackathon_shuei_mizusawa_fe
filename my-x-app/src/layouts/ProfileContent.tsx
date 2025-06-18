'use client';

import { useUserProfile } from '../features/profile/hooks/useUserProfile';
import { PostList } from '../features/post/PostList';
import BackHeader from '../components/header/BackHeader';
import Profile from '../features/profile/components/Profile';
import styles from './ProfileContent.module.css';
import { useFetchPostsByUser } from './hooks/useFetchPostsByUser';

export const ProfileContent = ({username} : {username: string}) => {
  const { posts, loading: isPostsLoading, error: postsError } = useFetchPostsByUser(username);
  const { profile, loading: isProfLoading } = useUserProfile(username)

  if (isProfLoading || isPostsLoading) {
    return <div className={styles.loading}>読み込み中...</div>;
  }

  if (!profile) {
    return <div className={styles.error}>プロフィールが見つかりませんでした。</div>;
  }
  if (postsError) {
    return <div className={styles.error}>投稿の読み込みに失敗しました: {postsError}</div>;
  }

  return (
    <div className={styles.profileContent}>
      <BackHeader title={profile.displayName}/>
      <div className={styles.scrollArea}>
        <Profile profile={profile}/>
        <PostList posts={posts} />
      </div>
    </div>
  );
};
