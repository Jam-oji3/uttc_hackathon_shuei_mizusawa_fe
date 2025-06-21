'use client';

import React, { useEffect } from 'react';
import { PostData } from '@/types/PostData';
import { CreatePostForm } from '../features/home/components/CreatePost';
import { useCreatePostLogic } from '../features/home/hooks/useCreatePost';
import { PostList } from '../features/post/PostList';
import { PostDetail } from '../features/post/PostDetail';
import styles from './PostDetailView.module.css';
import BackHeader from '../components/header/BackHeader';
import { useFetchReplies } from './hooks/useFetchReplies';
import { useFetchPost } from './hooks/useFetchPost';

export const PostDetailView = ({postId}: {postId: string}) => {
  const { post, loading: postLoading, error: postError } = useFetchPost(postId);
  const { replies, loading, error, reload } = useFetchReplies(postId);

  const onPostCreated = (newPost: PostData) => {
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
    userIconUrl,
    replyTo,
    setReplyTo
  } = useCreatePostLogic(onPostCreated);

  useEffect(() => {
    if (post) {
      setReplyTo(post.id);
    }
  }, [post, setReplyTo]);

  return (
    <div className={styles.detailView}>
      <BackHeader title="ポスト" />
      <div className={styles.scrollArea}>
        {postLoading ? (
          <div className={styles.loading}>ポストを読み込み中...</div>
        ) : postError ? (
          <div className={styles.error}>ポストの読み込みに失敗しました: {postError}</div>
        ) : !post ? (
          <div className={styles.error}>ポストが見つかりませんでした。</div>
        ) : (
          <>
            <PostDetail post={post} />
            <CreatePostForm
              text={text}
              setText={setText}
              handleUpload={handleUpload}
              uploadedUrl={previewUrl}
              uploadedType={uploadedType}
              isUploading={isUploading}
              handlePost={handlePost}
              userIconUrl={userIconUrl}
              placeholder="このポストに返信する"
              replyTo={postId}
              replyToUsername={post.author.username}
            />
            {loading && <p className={styles.loading}>リプライを読み込み中...</p>}
            {error && <p className={styles.error}>リプライの読み込みに失敗しました</p>}
            {!loading && !error && <PostList posts={replies} />}
          </>
        )}
      </div>
    </div>
  );
  
};
