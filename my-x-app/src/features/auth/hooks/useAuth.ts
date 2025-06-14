import { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../firebase'; // パスは適宜調整
import { verifyUserWithBackend } from '../api/authAPI';

export const useAuth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const signInWithGoogle = async () => {
    setIsLoading(true);
    setError(null);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      await verifyUserWithBackend(idToken);

      // 成功したらホームへ
      navigate('/home');

    } catch (err) {
      if (err instanceof Error && err.message === 'UserNotFound') {
        console.error("User not found, redirecting to signup.");
        navigate('/signup');
      } else {
        console.error("Google Sign-In Error:", err);
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { signInWithGoogle, isLoading, error };
};