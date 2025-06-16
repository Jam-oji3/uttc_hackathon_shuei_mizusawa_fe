export type PostData = {
    id: string;
    author: {
      displayName: string;
      username: string; // @handle のようなユーザー名
      iconUrl: string; // アイコン画像のURL
    };
    text: string;
    createdAt: string; // ISO 8601 形式のタイムスタンプ (例: "2025-06-11T19:30:00Z")
    mediaType?: 'photo' | 'model' | null; // 画像や3Dモデルのタイプ
    mediaUrl?: string | null; // 画像や3DモデルのURL
    replyTo?: string | null; // 返信先のポストID (返信機能が必要な場合)
    repostRef?: string | null; // リポスト元のポストID (リポスト機能が必要な場合)
    stats: {
      likes: number;
      reposts: number;
      comments: number;
    };
  };

  type RawPostResponse = {
    id: string;
    userId: string;
    tetx: string;
    replyTo?: string;
    repostRef?: string;
    mediaType?: 'photo' | 'model' | null;
    mediaUrl?: string | null;
    createdAt: string; // ISO 8601 形式のタイムスタンプ (例: "2025-06-11T19:30:00Z")
  }
