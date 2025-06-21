import { apiFetch } from "../../../api/apiClient";
import { CreatePostPayload, CreatePostResponse } from "@/types/api";
  
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