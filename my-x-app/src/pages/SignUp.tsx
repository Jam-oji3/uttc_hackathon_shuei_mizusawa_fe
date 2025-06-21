// pages/SignUp.tsx
import React from 'react';
import SignUpForm from '../features/auth/components/SignUpForm';
import styles from './SignUp.module.css';

const SignUp: React.FC = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUp;
