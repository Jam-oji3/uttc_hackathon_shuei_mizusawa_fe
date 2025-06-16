import { useEffect, useState } from 'react';
import { getUserProfile, UserProfile } from '../api/user';

export const useUserProfile = (username: string) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserProfile(username)
      .then(data => setProfile(data))
      .finally(() => setLoading(false));
  }, [username]);

  return { profile, loading };
};
