export type UserData = {
    id: string; 
    username: string; // ユーザー名 (例: @handle)
    displayName: string; // 表示名 (例: "山田 太郎")
    email: string; // メールアドレス (例: "
    bio: string; // 自己紹介 (例: "こんにちは！")
    iconUrl: string; // アイコン画像のURL (例: "https://example.com/avatar.jpg")
    createdAt: string; // アカウント作成日時 (ISO 8601 形式)
    updatedAt: string; // アカウント更新日時 (ISO 8601 形式)
}
    
export type UserProfile = {
    id: string;
    username: string;
    displayName: string;
    bio: string;
    iconUrl: string;
    createdAt: string; // ISO 8601形式のタイムスタンプ文字列を想定
    stats: {
        followingCount: number; // フォロー中のユーザー数
        followerCount: number; // フォロワー数
        postsCount: number; // 投稿数
    }
    isFollowing: boolean; // フォロー中かどうか
}