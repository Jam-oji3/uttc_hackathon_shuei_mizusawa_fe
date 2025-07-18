import { FaPhotoVideo, FaCube } from 'react-icons/fa';
import DefaultUserIcon from '../../../components/icons/DefaultUserIcon';
import { MediaPreview } from './MediaPreview';
import styles from './CreatePost.module.css';

interface Props {
  text: string;
  setText: (v: string) => void;
  handleUpload: (file: File | null, type: 'photo' | 'model' | null) => void;  // nullで削除も扱う
  uploadedUrl: string | null;
  uploadedType: 'photo' | 'model' | null;
  isUploading: boolean;
  handlePost: () => void;
  userIconUrl?: string; // ユーザーのアイコンURL（オプション）
  placeholder?: string; // テキストエリアのプレースホルダー
  replyTo?: string; // 返信先のポストID（オプション）
  replyToUsername?: string; // 返信先のユーザー名（オプション）
}

export const CreatePostForm = ({
  text,
  setText,
  handleUpload,
  uploadedUrl,
  uploadedType,
  isUploading,
  handlePost,
  userIconUrl,
  placeholder,
  replyTo,
  replyToUsername,
}: Props) => {
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'photo' | 'model') => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file, type);
    }
  };

  const onRemoveMedia = () => {
    handleUpload(null, null);
  };

  return (
    <div className={styles.createPostContainer}>
      <div className={styles.avatarContainer}>
        {
          userIconUrl ? 
          <img
          src={userIconUrl}
          alt="自分のアバター"
          className={styles.avatar}
        />:
          <DefaultUserIcon size={48} alt="自分のアバター" />
        }
        
      </div>
      <div className={styles.formContainer}>
        {replyToUsername && 
          <div className={styles.replyTo}>
            返信先: <span className={styles.mention}>@{replyToUsername}</span>さん
          </div>}
        <textarea
          className={styles.textarea}
          placeholder={placeholder ? placeholder :  "いまどうしてる？"}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {uploadedUrl && uploadedType && (
          <div style={{ marginTop: '8px', position: 'relative' }}>
            <MediaPreview url={uploadedUrl} type={uploadedType} />
            <button
              type="button"
              onClick={onRemoveMedia}
              className={styles.removeMediaButton}
              style={{
                position: 'absolute',
                top: 4,
                right: 4,
                background: 'rgba(0,0,0,0.5)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: 24,
                height: 24,
                cursor: 'pointer',
              }}
              aria-label="アップロード済みメディアを削除"
            >
              ×
            </button>
          </div>
        )}
        <div className={styles.actions}>
          <div className={styles.leftActions}>
            <label className={styles.iconButton} title="メディアを追加">
              <FaPhotoVideo />
              <input
                type="file"
                accept="image/*,video/*"
                onChange={(e) => onFileChange(e, 'photo')}
                style={{ display: 'none' }}
                disabled={isUploading}
              />
            </label>
            <label className={styles.iconButton} title="3Dモデルを追加">
              <FaCube />
              <input
                type="file"
                accept=".glb,.gltf,.obj,model/*"
                onChange={(e) => onFileChange(e, 'model')}
                style={{ display: 'none' }}
                disabled={isUploading}
              />
            </label>
          </div>
          <button
            className={styles.postButton}
            onClick={handlePost}
            disabled={isUploading || (!text && !uploadedUrl)}
          >
            {isUploading ? 'アップロード中...' : 'ポストする'}
          </button>
        </div>
      </div>
    </div>
  );
};

