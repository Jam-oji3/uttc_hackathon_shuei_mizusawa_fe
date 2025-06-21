'use client'

import { useState } from 'react';
import { PostData } from '@/types/PostData';
import { CreatePostForm } from '../features/home/components/CreatePost';
import { useCreatePostLogic } from '../features/home/hooks/useCreatePost';
import { PostList } from '../features/post/PostList';
import { Tabs } from '../features/home/components/Tabs';
import styles from './HomeTimeline.module.css';
import { useFetchRecentPosts } from './hooks/useFetchRecentPosts';

export const HomeTimeline = () => {
  const [activeTab, setActiveTab] = useState<'recommend' | 'following'>('recommend');
  // ここでAPIから投稿を取得
  const { posts, loading, error, reload } = useFetchRecentPosts(20, 0);

  const onPostCreated = (post: PostData) => {
    reload();
  };

  const {
    text,
    setText,
    handleUpload,
    handlePost,
    previewUrl,
    uploadedType,
    isUploading,
    userIconUrl
  } = useCreatePostLogic(onPostCreated);

  return (
    <div className={styles.timeline}>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className={styles.scrollArea}>
        <CreatePostForm
          text={text}
          setText={setText}
          handleUpload={handleUpload}
          uploadedUrl={previewUrl}
          uploadedType={uploadedType}
          isUploading={isUploading}
          handlePost={handlePost}
          userIconUrl={userIconUrl}
        />

        {/* 読み込み中やエラーの表示も入れる */}
        {loading && <p className={styles.loading}>新しいポストを読み込み中...</p>}
        {error && <p className={styles.error}>ポストの読み込みに失敗しました</p>}

        {!loading && !error && <PostList posts={posts} />}
      </div>
      
    </div>
  );
};
