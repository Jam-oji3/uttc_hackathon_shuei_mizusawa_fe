'use client'

import { useState } from 'react';
import { PostData } from '@/types/PostData';
import { CreatePostForm } from '../features/home/components/CreatePost';
import { PostList } from '../components/post/PostList';
import { Tabs } from '../features/home/components/Tabs';
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
  const [posts, setPosts] = useState<PostData[]>(dummyPosts);

  // CreatePostForm 用の state
  const [text, setText] = useState('');
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [uploadedType, setUploadedType] = useState<'photo' | 'model' | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (file: File | null, type: 'photo' | 'model' | null) => {
    if (!file || !type) {
      // ファイルがnullまたはtypeがnullならアップロード解除（メディア削除）
      setUploadedUrl(null);
      setUploadedType(null);
      return;
    }
  
    setIsUploading(true);
    try {
      // 仮のアップロード処理（実際はAPI経由）
      const fakeUrl = URL.createObjectURL(file);
      setUploadedUrl(fakeUrl);
      setUploadedType(type);
    } finally {
      setIsUploading(false);
    }
  };
  
  const handlePost = () => {
    if (!text && !uploadedUrl) return;

    const newPost: PostData = {
      id: Date.now().toString(),
      author: {
        name: 'あなた',
        username: '@your_name',
        avatarUrl: 'https://i.pravatar.cc/150?u=your_avatar',
      },
      content: text,
      createdAt: new Date().toISOString(),
      stats: {
        likes: 0,
        reposts: 0,
        comments: 0,
      },
    };

    setPosts([newPost, ...posts]);
    setText('');
    setUploadedUrl(null);
    setUploadedType(null);
  };

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