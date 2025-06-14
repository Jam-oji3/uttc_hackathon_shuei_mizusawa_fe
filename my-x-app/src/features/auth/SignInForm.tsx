import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase'; // Firebaseの設定をインポート
import AuthButton from './AuthButton';
import styles from './SignInForm.module.css';

const SignInForm: React.FC = () => {
  const navigate = useNavigate();

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user =result.user;
      const idToken = await user.getIdToken();

        // IDトークンをバックエンドに送信
      const response = await fetch(`${API_BASE_URL}/auth`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${idToken}`, // 推奨される方法
        },
      });
      if (response.status === 404) {
        // ユーザーが存在しない場合はサインアップ画面にリダイレクト
        console.error("ユーザーが存在しません。サインアップ画面にリダイレクトします。");
        navigate('/signup');
        return;
      }
      if (!response.ok) {
        throw new Error(`サーバーエラー: ${response.status}`);
      }
      const data = await response.json();
      navigate('/home')
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  return (
    <div className={styles.content}>
      <div className={styles.logo}>𝕏</div>
      <h1 className={styles.headerText}>すべての話題が、ここに。</h1>
      <h2 className={styles.joinText}>今すぐ参加しましょう。</h2>

      <div className={styles.buttonContainer}>
        <AuthButton
          onClick={signInWithGoogle}
          provider="google"
        >
          Googleでログイン
        </AuthButton>
        {/* <AuthButton onClick={() => {}} icon={AppleLogo} provider="apple">Appleでサインイン</AuthButton> */}
      </div>

      <div className={styles.divider}>
        <span className={styles.dividerLine}></span>
        <span>または</span>
        <span className={styles.dividerLine}></span>
      </div>

      <button className={styles.createAccountButton}>アカウントを作成</button>
      <p className={`${styles.termsText} ${styles.smallText}`}>
        登録することにより、<a href="#">利用規約</a>と<a href="#">プライバシーポリシー</a>に同意したとみなされます。
      </p>

      <div className={styles.loginPrompt}>
        <h3 className={styles.loginPromptText}>すでにアカウントをお持ちの場合</h3>
        <button className={styles.loginButton}>ログイン</button>
      </div>
    </div>
  );
};

export default SignInForm;