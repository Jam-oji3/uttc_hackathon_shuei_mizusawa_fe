import React from 'react';
import { useAuthContext } from '../../../contexts/AuthContext';
import AuthButton from './AuthButton';
import styles from './SignInForm.module.css';
import AppIcon from '../../../components/icons/AppIcon';

const SignInForm: React.FC = () => {
  const { signInWithGoogle, isLoading, error } = useAuthContext(); // ここをuseAuthContextに

  return (
    <div className={styles.content}>
      <AppIcon size={100} className={styles.iconLogo} />
      <h1 className={styles.headerText}>すべての話題が、ここに。</h1>
      <h2 className={styles.joinText}>今すぐ参加しましょう。</h2>

      <div className={styles.buttonContainer}>
        <AuthButton
          onClick={signInWithGoogle}
          provider="google"
        >
          {isLoading ? 'ログイン中...' : 'Googleでログイン'}
        </AuthButton>
      </div>

      {error && <p className={styles.errorText}>エラーが発生しました: {error.message}</p>}
    </div>
  );
};

export default SignInForm;
