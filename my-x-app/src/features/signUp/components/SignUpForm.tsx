import React from 'react';
import { useSignUpForm } from '../hooks/useSignUpForm';
import UserInputField from './UserInputField';
import TextAreaField from './TextAreaField';
import IconUploader from './IconUploader';
import styles from './SignUpForm.module.css';

const SignUpForm: React.FC = () => {
  // カスタムフックから状態とロジックをシンプルに受け取る
  const {
    formData,
    iconPreview,
    errors,
    isLoading,
    handleInputChange,
    handleIconChange,
    handleSubmit,
  } = useSignUpForm();

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>アカウント作成</h2>
      {/* noValidateでブラウザのデフォルトバリデーションを無効化 */}
      <form onSubmit={handleSubmit} noValidate>
        <UserInputField
          label="ユーザー名 (@user)"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          placeholder="5文字以上15文字以下の半角英数字"
          required
        />
        {errors.username && <p className={styles.error}>{errors.username}</p>}

        <UserInputField
          label="表示名"
          name="displayName"
          value={formData.displayName}
          onChange={handleInputChange}
          required
        />
        {errors.displayName && <p className={styles.error}>{errors.displayName}</p>}

        <TextAreaField
          label="自己紹介"
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
        />
        {errors.bio && <p className={styles.error}>{errors.bio}</p>}

        <IconUploader
          label="プロフィール画像"
          preview={iconPreview}
          onChange={handleIconChange}
        />

        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading ? '登録中...' : '登録する'}
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;