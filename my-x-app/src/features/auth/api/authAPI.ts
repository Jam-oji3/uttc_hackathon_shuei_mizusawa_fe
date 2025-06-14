
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

/**
 * IDトークンをバックエンドに送信してユーザー認証・情報取得を行う
 * @param idToken Firebaseから取得したIDトークン
 * @returns サーバーからのレスポンスデータ
 */
export const verifyUserWithBackend = async (idToken: string) => {
  const response = await fetch(`${API_BASE_URL}/auth`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${idToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`);
  }

  return await response.json();
};