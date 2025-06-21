import { useState } from 'react';
import { useStorageUpload } from '../../../hooks/useStorageUpload';
import { createPost } from '../api/posts';
import { PostData } from '@/types/PostData';
import { useAuthContext } from '../../../contexts/AuthContext';

export const useCreatePostLogic = (onPostCreated?: (newpost: PostData) => void) => {
  const [text, setText] = useState('');
  const [uploadedType, setUploadedType] = useState<'photo' | 'model' | null>(null);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [replyTo, setReplyTo] = useState<string | null>(null); // 返信先のポストID

  const { user, idToken, isLoading: isAuthLoading } = useAuthContext();
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
    if (!user || !idToken|| isAuthLoading) {
      console.log('You must be logged in to create a post.');
      return;
    }

    try {
      let mediaUrl: string | null = null;

      if (fileToUpload) {
        // 投稿時に初めてアップロードする
        mediaUrl = await uploadFile(fileToUpload);
      }

      const postId = await createPost(idToken,
        {
        text,
        mediaUrl,
        mediaType: uploadedType,
        replyTo,
        repostRef: null,
      });

      const now = new Date();

      onPostCreated?.({
        id: postId,
        author: {
          id: user.id,
          displayName: user.displayName,
          username: user.username,
          iconUrl: user.iconUrl,
        },
        text,
        createdAt: now.toISOString(),
        replyTo,
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
    previewUrl,
    uploadedType,
    isUploading: isLoading,
    handlePost,
    userIconUrl: user?.iconUrl,
    replyTo, 
    setReplyTo,   
  };
};
