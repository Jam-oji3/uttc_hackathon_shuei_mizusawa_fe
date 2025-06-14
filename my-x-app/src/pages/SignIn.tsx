import React from 'react';
import SignInForm from '../features/auth/components/SignInForm';
import styles from './SignIn.module.css';

const SignIn: React.FC = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <SignInForm />
      </div>
    </div>
  );
};

export default SignIn;