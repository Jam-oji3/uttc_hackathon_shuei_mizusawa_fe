import { UserData } from "@/types/UserData";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

interface RegisterSuccessResponse {
    success: boolean; // 成功フラグ
    user: UserData; // ユーザーデータの型を使用
    message: string; // オプションのメッセージ
}

export const registerUser = async (submissionData: FormData): Promise<RegisterSuccessResponse> => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    body: submissionData,
    // FormDataを使用する場合、Content-Typeヘッダーはブラウザが自動で設定するため、手動で指定しない
  });

  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`);
  }

  // 成功レスポンスをJSONとしてパースして返す
  return response.json();
};