import { apiFetch } from "../../../api/apiClient";
import { CreatePostPayload, CreatePostResponse } from "@/types/api";
  
  export const createPost = async (payload: CreatePostPayload) => {
    try {
      const res = await apiFetch<CreatePostResponse>('/posts', {
        method: 'POST',
        body: JSON.stringify(payload),
      })

      return res;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  };