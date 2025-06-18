import { apiFetch } from '../../api/apiClient';
import { FetchPostResponse, FetchPostsResponse } from '@/types/api';
import {PostData} from '@/types/PostData';

export const fetchRecentPosts = async (userId: string, limit: number, offset: number) => {
    const query = new URLSearchParams({
        userId: userId,
        limit: limit.toString(),
        offset: offset.toString(),
    });

    const resJSON = await apiFetch<FetchPostsResponse>(`/posts/recent?${query.toString()}`);
    return resJSON;
  };

export const fetchPostsByUser = async (viewerUserId: string, targetUserId: string, limit: number, offset: number) => {
    const query = new URLSearchParams({
        viewer: viewerUserId,
        limit: limit.toString(),
        offset: offset.toString(),
    });

    const resJSON = await apiFetch<FetchPostsResponse>(`/users/${targetUserId}/posts?${query.toString()}`);
    return resJSON;
}

export const fetchReplies = async (userId: string, parentPostId: string, limit: number, offset: number) => {
    const query = new URLSearchParams({
        userId: userId,
        limit: limit.toString(),
        offset: offset.toString(),
    });

    const resJSON = await apiFetch<FetchPostsResponse>(`/posts/${parentPostId}/replies?${query.toString()}`);
    return resJSON;
}

export const fetchPostById = async (userId: string, postId: string, ) => {
    const resJSON = await apiFetch<FetchPostResponse>(`/posts/${postId}?userId=${userId}`);
    return resJSON;
};