import { useEffect, useState, useRef } from 'react';
import { PostData } from '@/types/PostData';
import { useAuthContext } from '../../../contexts/AuthContext';
import { fetchPostById } from '../api/posts';

export const useFetchPost = (postId: string) => {
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isLoading: isAuthLoading, idToken } = useAuthContext();

  const hasLoaded = useRef(false);

  useEffect(() => {
    hasLoaded.current = false;  // postId変更時などに再読み込みを許可
  }, [postId]);

  useEffect(() => {
    if (!isAuthLoading && idToken && !hasLoaded.current) {
      hasLoaded.current = true;
  
      setLoading(true); // ← ここで即 setLoading(true) にしておく
  
      const fetchPost = async () => {
        setError(null);
  
        try {
          const json = await fetchPostById(idToken, postId);
          if (!json) throw new Error('No response from server');
          if (!json.success) throw new Error(json.message || 'Failed to load post');
          setPost(json.post);
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchPost();
    }
  }, [idToken, isAuthLoading, postId]);
  

  return { post, loading, error };
};
