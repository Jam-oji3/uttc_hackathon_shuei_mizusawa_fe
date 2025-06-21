import { useEffect, useState } from 'react';
import { getUserProfile, followUser, unfollowUser } from '../api/users'; // ここにAPI関数を用意してください
import { UserProfile } from '@/types/UserData';
import { useAuthContext } from '../../../contexts/AuthContext';

export const useUserProfile = (username: string) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { idToken, isLoading } = useAuthContext();

  useEffect(() => {
    if (isLoading || !idToken) {
      setLoading(true);
      return;
    }

    setLoading(true);
    getUserProfile(username, idToken)
      .then(data => {
        setProfile(data);
        // フォロー状態はAPIのデータから取得できると仮定（profileにisFollowingがあれば）
        setIsFollowing(data.isFollowing ?? false);
      })
      .catch(e => {
        setError((e as Error).message);
      })
      .finally(() => setLoading(false));
  }, [username, idToken, isLoading]);

  const toggleFollow = async () => {
    if (!profile || !idToken || followLoading) return;

    setFollowLoading(true);
    setError(null);

    try {
      if (isFollowing) {
        // フォロー解除API呼び出し（例）
        await unfollowUser(profile.id, idToken);
        setIsFollowing(false);
        // フォロワー数も減らす
        setProfile(prev => prev ? { ...prev, stats: { ...prev.stats, followerCount: prev.stats.followerCount - 1 } } : prev);
      } else {
        // フォローAPI呼び出し（例）
        await followUser(profile.id, idToken);
        setIsFollowing(true);
        // フォロワー数も増やす
        setProfile(prev => prev ? { ...prev, stats: { ...prev.stats, followerCount: prev.stats.followerCount + 1 } } : prev);
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setFollowLoading(false);
    }
  };

  return { profile, loading, isFollowing, toggleFollow, followLoading, error };
};
