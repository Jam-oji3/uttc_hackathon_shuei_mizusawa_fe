import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase'; // 初期化された Storage インスタンス
import { v4 as uuidv4 } from 'uuid'; // ユニークID生成用

export const uploadFile = (
  file: File,
  onProgress: (progress: number) => void
): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('ファイルが選択されていません。'));
      return;
    }

    // 一意なファイル名を生成
    const timestamp = Date.now();
    const uniqueId = uuidv4();
    const uniqueFileName = `${timestamp}-${uniqueId}-${file.name}`;

    // Firebase Storageの参照を作成
    const storageRef = ref(storage, `uploads/${uniqueFileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // アップロード進行状況の監視
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress(progress); // 親コンポーネントに進捗を伝える
      },
      (error) => {
        console.error('Upload error:', error);
        reject(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL); // ダウンロードURLを返す
        } catch (error) {
          console.error('Failed to get download URL:', error);
          reject(error);
        }
      }
    );
  });
};
