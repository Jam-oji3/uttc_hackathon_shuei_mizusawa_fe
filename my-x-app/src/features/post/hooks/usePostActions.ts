import { useState } from 'react';
import { createLike, deleteLike } from '../api/likes';
import { createRepost, deleteRepost } from '../api/reposts';
import { useAuthContext } from '../../../contexts/AuthContext';

export const usePostActions = (postId: string, initialLikes: number, initialLiked: boolean, initialReposts:number , initialReposted: boolean) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(initialLiked);
  const [reposts, setReposts] = useState(initialReposts);
  const [reposted, setReposted] = useState(initialReposted);
  const [isProcessing, setIsProcessing] = useState(false);
  const { user, idToken, isLoading: isAuthLoading } = useAuthContext();
  const toggleLike = async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    if (!user || !idToken || isAuthLoading) {
      console.error('ユーザーがログインしていません');
      setIsProcessing(false);
      return;
    }
    try {
      if (!liked) {
        await createLike(idToken, postId);
      }
      else {
        await deleteLike(idToken, postId);
      }
      setLiked(!liked);
      setLikes((prev) => prev + (liked ? -1 : 1));
      console.log(liked ? 'いいねを取り消しました' : 'いいねしました');
    } catch (e) {
      console.error('いいね失敗', e);
    } finally {
      setTimeout(() => setIsProcessing(false), 500);
    }
  };
  const toggleRepost = async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    if (!user || !idToken || isAuthLoading) {
      console.error('ユーザーがログインしていません');
      setIsProcessing(false);
      return;
    }
    try {
      if (!reposted) {
        await createRepost(idToken, postId);
      }
      else {
        await deleteRepost(idToken, postId);
      }
      setReposted(!reposted);
      setReposts((prev) => prev + (reposted ? -1 : 1));
      console.log(reposted ? 'リポストを取り消しました' : 'リポストしました');
    } catch (e) {
      console.error('リポスト失敗', e);
    } finally {
      setTimeout(() => setIsProcessing(false), 500);
    }
  };

  return {
    likes,
    liked,
    toggleLike,
    reposts,
    reposted,
    toggleRepost,
    isProcessing,
  };
};
