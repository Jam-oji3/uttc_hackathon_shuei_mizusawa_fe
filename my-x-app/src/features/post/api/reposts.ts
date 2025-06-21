import { apiFetch } from "../../../api/apiClient";
import { RepostData } from "@/types/RepostData";

export const createRepost = async (idToken: string, postId: string) => {
  const resJSON = await apiFetch<{ success: boolean; Repost: RepostData; message?: string }>("/reposts", {
    method: "POST",
    headers: {
      'Authorization': `Bearer ${idToken}`,
    },
    body: JSON.stringify({ postId }),
  });
  if (!resJSON) {
    throw new Error("Failed to create Repost: No response from server");
}
  if (!resJSON.success) {
    throw new Error(resJSON.message || "Failed to create Repost");
  }

  return resJSON;
}

export const deleteRepost = async (idToken: string, postId: string) => {
    const query = new URLSearchParams({
        postId: postId,
    });
    const resJSON = await apiFetch<{}>(`/reposts?${query.toString()}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${idToken}`,
        }
    });
    return resJSON;
    };