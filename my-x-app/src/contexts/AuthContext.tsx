import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { verifyUserWithBackend } from '../features/auth/api/authAPI';
import { UserData } from '@/types/UserData';

type AuthContextType = {
  user: UserData | null;
  isLoading: boolean;
  error: Error | null;
  signInWithGoogle: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true); // 初回ローディングもtrue
  const [error, setError] = useState<Error | null>(null);

  // Googleログイン処理
  const signInWithGoogle = async () => {
    setIsLoading(true);
    setError(null);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      const res = await verifyUserWithBackend(idToken);

      if (!res.success) {
        throw new Error(res.message || 'Unknown error occurred');
      }

      if (res.message === 'UserNotFound') {
        navigate('/sign-up', { state: { id: res.uid, email: res.email } });
        setUser(null);
        return;
      }

      if (!res.user) {
        throw new Error('User data not found in response');
      }

      setUser(res.user);
      navigate('/home');
    } catch (err) {
      console.error("Google Sign-In Error:", err);
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // 初回ロード時にFirebaseのセッションを復元
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      try {
        const idToken = await firebaseUser.getIdToken();
        const res = await verifyUserWithBackend(idToken);

        if (!res.success || !res.user) {
          setUser(null);
        } else {
          setUser(res.user);
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, error, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
