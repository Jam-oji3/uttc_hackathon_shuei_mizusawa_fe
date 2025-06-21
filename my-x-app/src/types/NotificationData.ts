export type NotificationData = {
    type: 'like' | 'repost' | 'follow' | 'reply';
    actor: {
        username: string;
        iconUrl: string;
    }
    targetId?: string;
    createdAt: string;
}