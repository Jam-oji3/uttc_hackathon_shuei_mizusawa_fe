import { UserData } from "@/types/UserData";
import {CreateUserPayload, RegisterSuccessResponse} from "@/types/api";
import { apiFetch } from "../../../api/apiClient";

export const registerUser = async (idToken: string, payload: CreateUserPayload) => {

  const response = await apiFetch<RegisterSuccessResponse>("/users", {
    method: "POST",
    headers: {
      'Authorization': `Bearer ${idToken}`
    },
    body: JSON.stringify(payload),
  });
  if (!response) {
    throw new Error("Failed to register user: No response from server");
  }
  return response;
};
