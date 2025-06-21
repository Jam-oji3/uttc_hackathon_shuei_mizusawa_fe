// components/ProtectedRoute.tsx
import { useAuthContext } from '../../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const { user, isLoading } = useAuthContext();

  if (isLoading) return null;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
