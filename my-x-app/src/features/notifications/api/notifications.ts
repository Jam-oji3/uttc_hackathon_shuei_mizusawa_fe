import { FetchNotificationsResponse } from "@/types/api";
import { apiFetch } from "../../../api/apiClient";

export const fetchNotifications = async (userId: string, limit: number=30, idToken: string) => {
    const query = new URLSearchParams({
        limit: limit.toString(),
    });
    const resJSON = await apiFetch<FetchNotificationsResponse>(`/notifications?${query.toString()}`, {
        headers: {
            'Authorization': `Bearer ${idToken}`,
        }
    })
    return resJSON
}