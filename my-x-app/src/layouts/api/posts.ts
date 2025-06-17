import { apiFetch } from '../../api/apiClient';
import { FetchRecentPostsResponse } from '@/types/api';

export const fetchRecentPosts = async (userId: string, limit: number, offset: number) => {
    const query = new URLSearchParams({
        userId: userId,
        limit: limit.toString(),
        offset: offset.toString(),
    });

    const resJSON = await apiFetch<FetchRecentPostsResponse>(`/posts/recent?${query.toString()}`);
    return resJSON;
  };
  