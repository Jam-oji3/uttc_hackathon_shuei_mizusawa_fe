import { UserData } from "@/types/UserData";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

interface RegisterSuccessResponse {
    success: boolean;
    user: UserData;
    message: string;
}

interface SubmissionData {
  id: string;
  email: string;
  username: string;
  displayName: string;
  bio: string;
  iconUrl: string;
}

export const registerUser = async (submissionData: SubmissionData): Promise<RegisterSuccessResponse> => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(submissionData),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    const errorMessage = error?.message || `Server error: ${response.status}`;
    throw new Error(errorMessage);
  }

  return response.json();
};
