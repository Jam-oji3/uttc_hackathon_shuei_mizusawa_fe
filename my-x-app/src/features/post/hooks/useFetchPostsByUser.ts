import { useState, useEffect, useRef } from 'react';
import { PostData } from '@/types/PostData';
import { fetchPostsByUser } from '../api/posts';
import { useAuthContext } from '../../../contexts/AuthContext';

export const useFetchPostsByUser = (targetUserId: string, limit = 20, offset = 0) => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { idToken, isLoading: isAuthLoading } = useAuthContext();

  const hasLoaded = useRef(false);

  const loadPosts = async () => {
    if (!idToken || isAuthLoading || loading) return;
    if (!targetUserId) return
  
    hasLoaded.current = true;
    
    setLoading(true);
    setError(null);
    try {
      const json = await fetchPostsByUser(idToken, targetUserId, limit, offset);
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

  // limitかoffsetが変わったら再読み込みを許可
  useEffect(() => {
    hasLoaded.current = false;
  }, [limit, offset, targetUserId]);

  useEffect(() => {
    if (!isAuthLoading && idToken && !hasLoaded.current) {
      hasLoaded.current = true;
      loadPosts();
    }
  }, [idToken, isAuthLoading, limit, offset, targetUserId]);

  return { posts, loading, error, reload: loadPosts };
};
