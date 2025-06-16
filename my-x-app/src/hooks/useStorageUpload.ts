import { useState } from 'react';
import { uploadFile as uploadFileApi } from '../api/storage';

// フックが返す値の型定義
interface UseStorageUploadResult {
  uploadFile: (file: File) => Promise<string>;
  progress: number;
  downloadURL: string | null;
  error: Error | null;
  isLoading: boolean;
}

export const useStorageUpload = (): UseStorageUploadResult => {
  const [progress, setProgress] = useState<number>(0);
  const [downloadURL, setDownloadURL] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const uploadFile = async (file: File) => {
    // 実行前に状態をリセット
    setIsLoading(true);
    setProgress(0);
    setDownloadURL(null);
    setError(null);

    try {
      const url = await uploadFileApi(file, (p) => {
        setProgress(p);
      });
      setDownloadURL(url); // 成功したらURLをstateに保存
      return url;
    } catch (e: any) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
    return "";
  };

  return {
    uploadFile,
    progress,
    downloadURL,
    error,
    isLoading,
  };
};