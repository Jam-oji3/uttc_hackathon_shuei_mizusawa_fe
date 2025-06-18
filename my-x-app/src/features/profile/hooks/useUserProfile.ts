import { useEffect, useState } from 'react';
import { getUserProfile} from '../api/user';
import { UserProfile } from '@/types/UserData';
import { useAuthContext } from '../../../contexts/AuthContext';

export const useUserProfile = (username: string) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const {idToken, isLoading} = useAuthContext();
  useEffect(() => {
    if (isLoading || !idToken) {
      setLoading(true);
      return;
    }
    setLoading(true);
    getUserProfile(username, idToken)
      .then(data => setProfile(data))
      .finally(() => setLoading(false));
  }, [username, idToken, isLoading]);

  return { profile, loading };
};
