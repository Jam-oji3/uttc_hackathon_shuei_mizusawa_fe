/**
 * Defines the shape of the data sent to the backend.
 * This should match the Go backend struct.
 */
export interface CreatePostPayload {
    userId: string;
    text: string;
    mediaType: 'photo' | 'model' | null;
    mediaUrl: string | null;
    replyTo?: string | null;
    repostRef?: string | null;
  }
  
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  
  export const createPost = async (payload: CreatePostPayload) => {
    try {
      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create post');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  };