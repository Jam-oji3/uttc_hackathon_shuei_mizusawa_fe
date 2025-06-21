import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { verifyUserWithBackend } from '../features/auth/api/authAPI';
import { UserData } from '@/types/UserData';

type AuthContextType = {
  user: UserData | null;
  isLoading: boolean;
  error: Error | null;
  idToken: string | null;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true); // 初回ローディングもtrue
  const [error, setError] = useState<Error | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);

  // Googleログイン処理
  const signInWithGoogle = async () => {
    setIsLoading(true);
    setError(null);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account' // 毎回アカウント選択画面を表示
    });
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      setIdToken(idToken);

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
      setIdToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  const signOutUser = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      setIdToken(null);
      setError(null);
    } catch (err) {
      console.error('Sign-out failed:', err);
      setError(err instanceof Error ? err : new Error('Sign-out failed'));
    } finally {
      setIsLoading(false);
    }
  };
  

  // 初回ロード時にFirebaseのセッションを復元
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setIdToken(null);
        setIsLoading(false);
        return;
      }

      try {
        const idToken = await firebaseUser.getIdToken();
        setIdToken(idToken);
        
        const res = await verifyUserWithBackend(idToken);

        if (!res.success || !res.user) {
          setUser(null);
        } else {
          setUser(res.user);
        }
        setIsLoading(false);
      } catch (err) {
        console.error('Auth check failed:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setUser(null);
        setIdToken(null);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    });

    const unsubscribeToken = auth.onIdTokenChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setIdToken(token);
      } else {
        setIdToken(null);
      }
    });

    return () => {
      unsubscribe();
      unsubscribeToken();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, error, idToken, signInWithGoogle, signOutUser }}>
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
