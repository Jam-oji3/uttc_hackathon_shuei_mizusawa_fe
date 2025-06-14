// src/components/SignUpForm.tsx

import React from 'react';
import { useSignUpForm } from '../hooks/useSignUpForm';
import UserInputField from './UserInputField';
import TextAreaField from './TextAreaField';
import IconUploader from './IconUploader';
import styles from './SignUpForm.module.css';

const SignUpForm: React.FC = () => {
  // カスタムフックから状態とロジックを受け取る
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
      <form onSubmit={handleSubmit} noValidate>
        <UserInputField
          label="ユーザー名（@user）"
          name="userName"
          value={formData.userName}
          onChange={handleInputChange}
          required={true}
        />
        {errors.userName && <p className={styles.error}>{errors.userName}</p>}

        <UserInputField
          label="表示名"
          name="displayName"
          value={formData.displayName}
          onChange={handleInputChange}
          required={true}
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