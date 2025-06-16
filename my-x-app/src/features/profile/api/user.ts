import { UserData } from '@/types/UserData';

export type UserProfile = {
    user: UserData
    followersCount: number;
    followingCount: number;
  };
  
  export const getUserProfile = async (username: string): Promise<UserProfile> => {
    // 仮のAPI（実際はfetchなどで取得）
    return {
      user:{
        id: "abcdefghijklmnopqrstuvwxyz12",
        username: username,
        displayName: "テスト ユーザー",
        email: "test@test.com",
        bio: "これはテストユーザーのプロフィールです。",
        iconUrl: "https://example.com/icon.png",
        createdAt: "2023-01-01T00:00:00Z",
        updatedAt: "2023-01-02T00:00:00Z",
      },
      followersCount: 120,
      followingCount: 80,
    };
  };
  