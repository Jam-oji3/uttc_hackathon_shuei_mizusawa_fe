import { UserProfile } from '@/types/UserData';
import { apiFetch } from '../../../api/apiClient';
import { FetchUserProfileResponse, SimpleResponse, CreateUserPayload, RegisterSuccessResponse } from '@/types/api';
  
  export const getUserProfile = async (username: string, idToken: string): Promise<UserProfile> => {
    const resJSON = await apiFetch<FetchUserProfileResponse>(`/users/${username}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${idToken}`
        },
      }
    );
    if (!resJSON) {
      throw new Error('Failed to fetch user profile: No response from server');
    }
    
    return resJSON.profile;
  };

  export const followUser = async (userId: string, idToken: string): Promise<SimpleResponse> => {

    const resJSON = await apiFetch<SimpleResponse>(`/users/${userId}/follow`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${idToken}`
      },
    });
    if (!resJSON) {
      throw new Error('Failed to follow user: No response from server');
    }
    return resJSON
  }
  
  export const unfollowUser = async (userId: string, idToken: string): Promise<void>=> {
    await apiFetch<{}>(`/users/${userId}/follow`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${idToken}`
      },
    });
    return;
  }

  export const registerUser = async (idToken: string, payload: CreateUserPayload) => {

    const response = await apiFetch<RegisterSuccessResponse>("/users", {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${idToken}`
      },
      body: JSON.stringify(payload),
    });
    if (!response) {
      throw new Error("Failed to register user: No response from server");
    }
    return response;
  };