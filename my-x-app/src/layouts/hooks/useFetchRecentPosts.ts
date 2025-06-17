import { useState, useEffect } from 'react';
import { PostData } from '@/types/PostData';
import { fetchRecentPosts } from '../api/posts';
import { useAuthContext } from '../../contexts/AuthContext';

export const useFetchRecentPosts = (limit = 20, offset = 0) => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, isLoading: isAuthLoading } = useAuthContext(); // ユーザー情報を取得するためのカスタムフック


  const loadPosts = async () => {

    if (!user) {
      setError('User not authenticated');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const json = await fetchRecentPosts(user.id, limit, offset);
      if (!json) {
        throw new Error('No response from server');
      }
      if (json.success) {
        setPosts(json.posts);
      } else {
        setError(json.message || 'Failed to load posts');
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthLoading && user) {
      loadPosts();
    }
  }, [user, isAuthLoading, limit, offset]);

  return { posts, loading, error, reload: loadPosts };
};
