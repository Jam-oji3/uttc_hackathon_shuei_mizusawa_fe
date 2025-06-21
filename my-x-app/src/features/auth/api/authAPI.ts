import { apiFetch } from "../../../api/apiClient";
import { VerifyUserResponse } from "@/types/api";



export const verifyUserWithBackend = async (idToken: string): Promise<VerifyUserResponse> => {
  const json = await apiFetch<VerifyUserResponse>(`/auth`,{
    method: 'GET',
    headers: {'Authorization': `Bearer ${idToken}`}
  })
  if (!json) {
    throw new Error("Failed to verify user: No response from server");
  }
  return json;
};