// useSearchPosts.ts
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchPostsByKeyword } from '../api/posts';
import { useAuthContext } from '../../contexts/AuthContext';
import { PostData } from '@/types/PostData';

export const useSearchPosts = (limit = 20, offset = 0) => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { idToken, isLoading: isAuthLoading, user } = useAuthContext();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('q') || '';

  useEffect(() => {
    if (!keyword.trim() || isAuthLoading || !idToken || !user) return;

    const fetch = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchPostsByKeyword(idToken, keyword, limit, offset);
        if (!data || !data.success) {
          throw new Error(data?.message || 'Failed to fetch posts');
        }
        setPosts(data.posts);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [keyword, limit, offset, idToken, isAuthLoading, user]);

  return { posts, loading, error, keyword };
};
