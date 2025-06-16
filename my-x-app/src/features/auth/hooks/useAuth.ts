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
  
      const res = await verifyUserWithBackend(idToken);
  
      if (!res.success){
        throw new Error(res.message || 'Unknown error occurred');
      }
      if (res.message === 'UserNotFound') {
        // UserNotFoundのときはサインアップ画面へuidとemailを渡して遷移
        navigate('/sign-up', { state: { id: res.uid, email: res.email } });
        return;
      }
      navigate('/home', { state: { user: res.user } });
  
    } catch (err) {
      console.error("Google Sign-In Error:", err);
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  };
  

  return { signInWithGoogle, isLoading, error };
};