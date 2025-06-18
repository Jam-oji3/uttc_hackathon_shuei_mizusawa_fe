import { UserData, UserProfile } from '@/types/UserData';
import { apiFetch } from '../../../api/apiClient';
import { FetchUserProfileResponse } from '@/types/api';
  
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
    if (!resJSON.success) {
      throw new Error(resJSON.message || 'Failed to fetch user profile');
    }
    return resJSON.profile;
  };
  