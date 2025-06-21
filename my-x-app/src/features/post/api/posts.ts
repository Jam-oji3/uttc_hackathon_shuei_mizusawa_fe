import { apiFetch } from '../../../api/apiClient';
import { FetchPostResponse, FetchPostsResponse, CreatePostPayload, CreatePostResponse } from '@/types/api';
import {PostData} from '@/types/PostData';

export const fetchRecentPosts = async (idToken: string, limit: number, offset: number) => {
    const query = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
    });

    const resJSON = await apiFetch<FetchPostsResponse>(`/posts/recent?${query.toString()}`,{
        headers: {
            'Authorization': `Bearer ${idToken}`,
        }
    });
    return resJSON;
  };

export const fetchPostsByUser = async (idToken: string, targetUserId: string, limit: number, offset: number) => {
    const query = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
    });

    const resJSON = await apiFetch<FetchPostsResponse>(`/users/${targetUserId}/posts?${query.toString()}`, {
        headers: {
            'Authorization': `Bearer ${idToken}`,
        }
    });
    return resJSON;
}

export const fetchReplies = async (idToken: string, parentPostId: string, limit: number, offset: number) => {
    const query = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
    });

    const resJSON = await apiFetch<FetchPostsResponse>(`/posts/${parentPostId}/replies?${query.toString()}`, {
        headers: {
            'Authorization': `Bearer ${idToken}`,
        }
    });
    return resJSON;
}

export const fetchPostById = async (idToken: string, postId: string, ) => {
    const resJSON = await apiFetch<FetchPostResponse>(`/posts/${postId}`, {
        headers: {
            'Authorization': `Bearer ${idToken}`,
        }
    });
    return resJSON;
};

export const fetchPostsByKeyword = async (idToken: string, keyword: string, limit: number, offset: number) => {
    const query = new URLSearchParams({
        keyword: keyword,
        limit: limit.toString(),
        offset: offset.toString(),
    })
    const resJSON = await apiFetch<FetchPostsResponse>(`/posts/search?${query.toString()}`, {
        headers: {
            'Authorization': `Bearer ${idToken}`,
        }
    });
    if (!resJSON) {
        throw new Error('Failed to fetch posts: No response from server');
    }
    return resJSON;
}

export const createPost = async (idToken: string, payload: CreatePostPayload) => {
    try {
      const res = await apiFetch<CreatePostResponse>('/posts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${idToken}`,
        },
        body: JSON.stringify(payload),
      })
      if (!res) {
        throw new Error('Failed to create post: No response from server');
      }
      if (!res.post) {
        throw new Error(res.message || 'Failed to create post');
      }
      return res.post.id;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  };