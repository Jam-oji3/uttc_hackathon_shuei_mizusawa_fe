import { apiFetch } from "../../../api/apiClient";
import { RepostData } from "@/types/RepostData";

export const createRepost = async (postId: string, userId: string) => {
  const resJSON = await apiFetch<{ success: boolean; Repost: RepostData; message?: string }>("/reposts", {
    method: "POST",
    body: JSON.stringify({ postId, userId }),
  });
  if (!resJSON) {
    throw new Error("Failed to create Repost: No response from server");
}
  if (!resJSON.success) {
    throw new Error(resJSON.message || "Failed to create Repost");
  }

  return resJSON;
}

export const deleteRepost = async (postId: string, userId: string) => {
    const query = new URLSearchParams({
        userId: userId,
        postId: postId,
    });
    const resJSON = await apiFetch<{}>(`/Reposts?${query.toString()}`, {
        method: "DELETE",
    });
    return resJSON;
    };