import { useState, useEffect, useRef } from 'react';
import { PostData } from '@/types/PostData';
import { fetchRecentPosts } from '../api/posts';
import { useAuthContext } from '../../contexts/AuthContext';

export const useFetchRecentPosts = (limit = 40, offset = 0) => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { idToken, isLoading: isAuthLoading } = useAuthContext();

  const hasLoaded = useRef(false);

  const loadPosts = async () => {
    if (!idToken || isAuthLoading || loading) return;

    setLoading(true);
    setError(null);
    try {
      const json = await fetchRecentPosts(idToken, limit, offset);
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

  // offset や limit が変わったらリロードを許可
  useEffect(() => {
    hasLoaded.current = false;
  }, [limit, offset]);

  useEffect(() => {
    if (!isAuthLoading && idToken && !hasLoaded.current) {
      hasLoaded.current = true;
      loadPosts();
    }
  }, [idToken, isAuthLoading, limit, offset]);

  return { posts, loading, error, reload: loadPosts };
};
