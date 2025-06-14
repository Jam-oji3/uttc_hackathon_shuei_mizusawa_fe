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
    