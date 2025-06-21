import { apiFetch } from "../../../api/apiClient";
import { LikeData } from "@/types/LikeData";

export const createLike = async (idToken: string, postId: string) => {
  const resJSON = await apiFetch<{ success: boolean; like: LikeData; message?: string }>("/likes", {
    method: "POST",
    headers: {
      'Authorization': `Bearer ${idToken}`,
    },
    body: JSON.stringify({ postId}),
  });
  if (!resJSON) {
    throw new Error("Failed to create like: No response from server");
}
  if (!resJSON.success) {
    throw new Error(resJSON.message || "Failed to create like");
  }

  return resJSON;
}

export const deleteLike = async (idToken: string, postId: string) => {
    const query = new URLSearchParams({
        postId: postId,
    });
    const resJSON = await apiFetch<{}>(`/likes?${query.toString()}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${idToken}`,
        }
    });
    return resJSON;
    };