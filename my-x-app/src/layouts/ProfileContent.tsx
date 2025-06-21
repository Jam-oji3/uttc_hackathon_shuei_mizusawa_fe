'use client';

import { useUserProfile } from '../features/profile/hooks/useUserProfile';
import { PostList } from '../features/post/PostList';
import BackHeader from '../components/header/BackHeader';
import Profile from '../features/profile/components/Profile';
import styles from './ProfileContent.module.css';
import { useFetchPostsByUser } from './hooks/useFetchPostsByUser';
import { useAuthContext } from '../contexts/AuthContext';

export const ProfileContent = ({ username }: { username: string }) => {
  
  const { profile, loading: isProfLoading, isFollowing, toggleFollow, followLoading, error: followError } = useUserProfile(username);
  const { user, isLoading: isAuthLoading } = useAuthContext();

  const { posts, loading: isPostsLoading, error: postsError } = useFetchPostsByUser(profile?.id ?? '');

  return (
    <div className={styles.profileContent}>
      {isProfLoading || isPostsLoading || isAuthLoading ? (
        <div className={styles.loading}>読み込み中...</div>
      ) : !user ? (
        <div className={styles.error}>ログインしていません。</div>
      ) : !profile ? (
        <div className={styles.error}>プロフィールが見つかりませんでした。</div>
      ) : postsError ? (
        <div className={styles.error}>投稿の読み込みに失敗しました: {postsError}</div>
      ) : (
        <>
          <BackHeader title={profile.displayName} />
          <div className={styles.scrollArea}>
            <Profile 
              profile={profile} 
              viewerId={user.id}
              isFollowing={isFollowing}
              onFollowToggle={toggleFollow} 
            />
            {followLoading && <p className={styles.loading}>処理中...</p>}
            {followError && <p className={styles.error}>フォロー操作に失敗しました: {followError}</p>}
            <PostList posts={posts} />
          </div>
        </>
      )}
    </div>
  );
  
};
