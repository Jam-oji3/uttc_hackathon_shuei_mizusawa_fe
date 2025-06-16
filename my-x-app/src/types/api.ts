import { UserData } from './UserData';

export type VerifyUserResponse = {
    success: boolean;
    message: string;
    uid: string;
    email: string;
    user?: UserData;
}

export type CreatePostPayload ={
    userId: string;
    text: string;
    mediaType: 'photo' | 'model' | null;
    mediaUrl: string | null;
    replyTo?: string | null;
    repostRef?: string | null;
  }

export type RowPostData = {
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
    post: string;
};