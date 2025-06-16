import { useState } from 'react';
import { useStorageUpload } from '../../../hooks/useStorageUpload';
import { createPost } from '../api/createPostApi';
import { PostData } from '@/types/PostData';

export const useCreatePostLogic = (onPostCreated?: (newpost: PostData) => void) => {
  const [text, setText] = useState('');
  const [uploadedType, setUploadedType] = useState<'photo' | 'model' | null>(null);

  const {
    uploadFile,
    downloadURL,
    isLoading,
  } = useStorageUpload();

  const handleUpload = async (file: File | null, type: 'photo' | 'model' | null) => {
    if (!file || !type) {
      setUploadedType(null);
      return;
    }

    if (downloadURL) {
      alert('You can only upload one piece of media at a time.');
      return;
    }

    await uploadFile(file); 
    setUploadedType(type);
  };

  const handlePost = async () => {
    // ❗ This is a placeholder. In a real app, you would get
    // the user ID from your authentication context or state management.
    const userId = 'rtXMVdtcnBRvhvCNzpLQI1tBdfb2';

    try {
      
      await createPost({
        userId,
        text,
        mediaUrl: downloadURL,
        mediaType: uploadedType,
        replyTo: null, // 返信機能が必要な場合は適宜設定
        repostRef: null, // リポスト機能が必要な場合は適宜設定
      });

      alert('Post created successfully!');

      const now = new Date();
      onPostCreated?.({
        id: userId,
        author: {
          displayName: 'あなた',
          userName: 'your_username',
          iconUrl: 'https://i.pravatar.cc/150?u=your_avatar'
        },
        text: 'これは本文',
        createdAt: now.toISOString(),
        mediaType: uploadedType,
        mediaUrl: downloadURL,
        stats: {
          likes: 0,
          reposts: 0,
          comments: 0,
        }
      })
      setText('');
      setUploadedType(null);

    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : 'Could not create post.'}`);
    }
  };

  return {
    text,
    setText,
    handleUpload,
    uploadedUrl: downloadURL,
    uploadedType,
    isUploading: isLoading,
    handlePost,
  };
};