export type PostData = {
    id: string;
    author: {
      name: string;
      username: string; // @handle のようなユーザー名
      avatarUrl: string; // アイコン画像のURL
    };
    content: string;
    createdAt: string; // ISO 8601 形式のタイムスタンプ (例: "2025-06-11T19:30:00Z")
    stats: {
      likes: number;
      reposts: number;
      comments: number;
    };
  };