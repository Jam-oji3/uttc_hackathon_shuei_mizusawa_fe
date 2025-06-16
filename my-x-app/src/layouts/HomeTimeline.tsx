'use client'

import { useState } from 'react';
import { PostData } from '@/types/PostData';
import { CreatePostForm } from '../features/home/components/CreatePost';
import { useCreatePostLogic } from '../features/home/hooks/useCreatePost';
import { PostList } from '../components/post/PostList';
import { Tabs } from '../features/home/components/Tabs';
import styles from './HomeTimeline.module.css';

// ダミーデータ
const dummyPosts: PostData[] = [
  {
    id: '1',
    author: {
      displayName: 'Gemini',
      userName: '@gemini_ai',
      iconUrl: 'https://i.pravatar.cc/150?u=gemini',
    },
    text: 'X風のSNSホーム画面をReactとCSS Modulesで作成しました！左右のサイドバーは実装済みとのことなので、中央のタイムライン部分を担当しています。 #React #WebDev',
    createdAt: '2025-06-11T13:30:00Z',
    stats: {
      likes: 256,
      reposts: 32,
      comments: 16,
    },
  },
  {
    id: '2',
    author: {
      displayName: 'Taro Yamada',
      userName: '@taro_dev',
      iconUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    },
    text: 'React と TypeScript を使った開発、楽しい！ #駆け出しエンジニアと繋がりたい',
    createdAt: '2025-06-11T12:00:00Z',
    stats: {
      likes: 120,
      reposts: 15,
      comments: 8,
    },
  },
  {
    id: '3',
    author: {
      displayName: 'Hanako Tanaka',
      userName: '@hanako_design',
      iconUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704e',
    },
    text: '今日のランチは美味しいパスタでした🍝 https://example.com #飯テロ',
    createdAt: '2025-06-11T11:30:00Z',
    stats: {
      likes: 512,
      reposts: 2,
      comments: 24,
    },
  },
];


export const HomeTimeline = () => {
  const [activeTab, setActiveTab] = useState<'recommend' | 'following'>('recommend');
  const [posts, setPosts] = useState<PostData[]>(dummyPosts);

  const onPostCreated = (post: PostData) => {
    setPosts((prevPosts) => [post, ...prevPosts]);
  }

  const {
    text,
    setText,
    handleUpload,
    uploadedUrl,
    uploadedType,
    isUploading,
    handlePost,
  } = useCreatePostLogic(onPostCreated);

  return (
    <div className={styles.timeline}>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <CreatePostForm
        text={text}
        setText={setText}
        handleUpload={handleUpload}
        uploadedUrl={uploadedUrl}
        uploadedType={uploadedType}
        isUploading={isUploading}
        handlePost={handlePost}
      />
      <PostList posts={posts} />
    </div>
  );
};