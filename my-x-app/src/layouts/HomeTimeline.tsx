'use client'

import { useState } from 'react';
import { PostData } from '@/types/PostData';
import { CreatePost } from '../features/homeTimeline/CreatePost';
import { PostList } from '../components/post/PostList';
import { Tabs } from '../features/homeTimeline/Tabs';
import styles from './HomeTimeline.module.css';

// ダミーデータ
const dummyPosts: PostData[] = [
  {
    id: '1',
    author: {
      name: 'Gemini',
      username: '@gemini_ai',
      avatarUrl: 'https://i.pravatar.cc/150?u=gemini',
    },
    content: 'X風のSNSホーム画面をReactとCSS Modulesで作成しました！左右のサイドバーは実装済みとのことなので、中央のタイムライン部分を担当しています。 #React #WebDev',
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
      name: 'Taro Yamada',
      username: '@taro_dev',
      avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    },
    content: 'React と TypeScript を使った開発、楽しい！ #駆け出しエンジニアと繋がりたい',
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
      name: 'Hanako Tanaka',
      username: '@hanako_design',
      avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704e',
    },
    content: '今日のランチは美味しいパスタでした🍝 https://example.com #飯テロ',
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
  // TODO: activeTabに応じてAPIから取得するデータを切り替える
  const [posts, setPosts] = useState<PostData[]>(dummyPosts);

  return (
    <div className={styles.timeline}>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <CreatePost />
      <PostList posts={posts} />
    </div>
  );
};