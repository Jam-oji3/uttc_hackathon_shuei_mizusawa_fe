import { UserData, UserProfile } from './UserData';
import { PostData } from './PostData';
import { LikeData } from './LikeData';
import { TrendData } from './TrendData';
import { NotificationData } from './NotificationData';

export type VerifyUserResponse = {
    success: boolean;
    message: string;
    uid: string;
    email: string;
    user?: UserData;
}

export type CreateUserPayload = {
  email: string;
  username: string;
  displayName: string;
  bio: string;
  iconUrl: string;
}

export type RegisterSuccessResponse = {
    success: boolean;
    user: UserData;
    message: string;
}

export type CreatePostPayload ={
    text: string;
    mediaType: 'photo' | 'model' | null;
    mediaUrl: string | null;
    replyTo?: string | null;
    repostRef?: string | null;
  }

export type RawPostData = {
    id: string;
    userId: string;
    text: string;
    replyTo?: string | null;
    repostRef?: string | null;
    mediaType?: string | null;
    mediaUrl?: string | null;
    createdAt: string; // ISO 8601形式のタイムスタンプ文字列を想定
}

export type CreatePostResponse = {
    success: boolean;
    message: string;
    post: RawPostData;
};

export type FetchPostResponse = {
    success: boolean;
    message: string;
    post: PostData;
}

export type FetchPostsResponse = {
    success: boolean;
    message: string;
    posts: PostData[];
}

export type CreateLikeResponse = {
    success: boolean;
    like: LikeData;
    message: string;
}

export type FetchUserProfileResponse = {
    success: boolean;
    profile: UserProfile;
    message: string;
}

export type SimpleResponse = {
    success: boolean;
    message: string;
}

export type FetchTrendsResponse = {
    success: boolean;
    trends: TrendData[];
    message: string;
}

export type FetchNotificationsResponse = {
    success: boolean;
    notifications: NotificationData[];
    message: string;
}