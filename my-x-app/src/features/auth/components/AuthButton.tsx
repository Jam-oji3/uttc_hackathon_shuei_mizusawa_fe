import React from 'react';
import styles from './AuthButton.module.css';

// ボタンに渡すPropsの型定義
type Props = {
  onClick: () => void;
  provider: 'google' | 'apple' | 'default'; // プロバイダーに応じてスタイルを分ける
  children: React.ReactNode;
};

const AuthButton: React.FC<Props> = ({ onClick, provider, children }) => {
  // provider名を使って動的にクラス名を生成
  const buttonClass = `${styles.authButton} ${styles[provider]}`;

  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default AuthButton;