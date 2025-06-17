import { apiFetch } from "../../../api/apiClient";
import { LikeData } from "@/types/LikeData";

export const createLike = async (postId: string, userId: string) => {
  const resJSON = await apiFetch<{ success: boolean; like: LikeData; message?: string }>("/likes", {
    method: "POST",
    body: JSON.stringify({ postId, userId }),
  });
  if (!resJSON) {
    throw new Error("Failed to create like: No response from server");
}
  if (!resJSON.success) {
    throw new Error(resJSON.message || "Failed to create like");
  }

  return resJSON;
}

export const deleteLike = async (postId: string, userId: string) => {
    const query = new URLSearchParams({
        userId: userId,
        postId: postId,
    });
    const resJSON = await apiFetch<{}>(`/likes?${query.toString()}`, {
        method: "DELETE",
    });
    return resJSON;
    };