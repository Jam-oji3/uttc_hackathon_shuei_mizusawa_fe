import React from 'react';
import { useAuth } from '../hooks/useAuth'; // カスタムフックをインポート
import AuthButton from './AuthButton';
import styles from './SignInForm.module.css';

const SignInForm: React.FC = () => {
  const { signInWithGoogle, isLoading, error } = useAuth(); // フックを使う

  return (
    <div className={styles.content}>
      <div className={styles.logo}>𝕏</div>
      <h1 className={styles.headerText}>すべての話題が、ここに。</h1>
      <h2 className={styles.joinText}>今すぐ参加しましょう。</h2>

      <div className={styles.buttonContainer}>
        <AuthButton
          onClick={signInWithGoogle} // フックから得た関数を渡すだけ
          provider="google"
        >
          {isLoading ? 'ログイン中...' : 'Googleでログイン'}
        </AuthButton>
      </div>
      
      {/* エラーメッセージの表示 */}
      {error && <p className={styles.errorText}>エラーが発生しました: {error.message}</p>}

      {/* ...以降のJSXは同じ... */}
    </div>
  );
};

export default SignInForm;