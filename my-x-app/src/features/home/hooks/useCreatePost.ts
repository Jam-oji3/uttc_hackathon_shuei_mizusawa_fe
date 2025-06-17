import { useState } from 'react';
import { useStorageUpload } from '../../../hooks/useStorageUpload';
import { createPost } from '../api/createPostApi';
import { PostData } from '@/types/PostData';
import { useAuthContext } from '../../../contexts/AuthContext';

export const useCreatePostLogic = (onPostCreated?: (newpost: PostData) => void) => {
  const [text, setText] = useState('');
  const [uploadedType, setUploadedType] = useState<'photo' | 'model' | null>(null);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { user } = useAuthContext();
  const { uploadFile, isLoading } = useStorageUpload();

  const handleUpload = (file: File | null, type: 'photo' | 'model' | null) => {
    if (!file || !type) {
      // リセット
      setFileToUpload(null);
      setPreviewUrl(null);
      setUploadedType(null);
      return;
    }

    setFileToUpload(file);
    setUploadedType(type);

    // プレビュー用URLを作成（アップロードはしない）
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const handlePost = async () => {
    if (!user) {
      alert('You must be logged in to create a post.');
      return;
    }

    try {
      let mediaUrl: string | null = null;

      if (fileToUpload) {
        // 投稿時に初めてアップロードする
        mediaUrl = await uploadFile(fileToUpload);
      }

      await createPost({
        userId: user.id,
        text,
        mediaUrl,
        mediaType: uploadedType,
        replyTo: null,
        repostRef: null,
      });

      alert('Post created successfully!');

      const now = new Date();

      onPostCreated?.({
        id: user.id,
        author: {
          id: user.id,
          displayName: user.displayName,
          username: user.username,
          iconUrl: user.iconUrl || 'https://i.pravatar.cc/150?u=a042581f4e29026704e',
        },
        text,
        createdAt: now.toISOString(),
        mediaType: uploadedType,
        mediaUrl,
        stats: {
          likes: 0,
          reposts: 0,
          comments: 0,
        },
        userActions: {
          liked: false,
          reposted: false,
        },
      });

      // 後片付け
      setText('');
      setUploadedType(null);
      setFileToUpload(null);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl); // メモリ解放
        setPreviewUrl(null);
      }
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : 'Could not create post.'}`);
    }
  };

  return {
    text,
    setText,
    handleUpload,
    previewUrl,      // ここでプレビューURLを返すので、表示に使える
    uploadedType,
    isUploading: isLoading,
    handlePost,
    userIconUrl: user?.iconUrl || 'https://i.pravatar.cc/150?u=a042581f4e29026704e',
  };
};
