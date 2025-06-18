import { useState, useEffect, useRef } from 'react';
import { PostData } from '@/types/PostData';
import { fetchReplies } from '../api/posts';
import { useAuthContext } from '../../contexts/AuthContext';

export const useFetchReplies = (parentPostId: string, limit = 20, offset = 0) => {
  const [replies, setReplies] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, isLoading: isAuthLoading } = useAuthContext();
  const hasLoaded = useRef(false);

  const loadReplies = async () => {
    if (!user || isAuthLoading || loading) return;
    setLoading(true);
    setError(null);

    try {
      const json = await fetchReplies(user.id, parentPostId, limit, offset);
      if (!json) throw new Error('No response from server');
      if (json.success) {
        setReplies(json.posts);
      } else {
        setError(json.message || 'Failed to load replies');
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    hasLoaded.current = false; // parentPostIdが変わったら再読み込みOKに
  }, [parentPostId]);

  useEffect(() => {
    if (!isAuthLoading && user?.id && !hasLoaded.current) {
      hasLoaded.current = true;
      loadReplies();
    }
  }, [user?.id, isAuthLoading, parentPostId]);

  return { replies, loading, error, reload: loadReplies };
};
