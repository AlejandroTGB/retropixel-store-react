import { Navigate } from 'react-router-dom';
import { authService } from '../services/authService';

export default function ProtectedRoute({ children }) {
  const token = authService.getToken();
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  let isAdmin = false;
  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    isAdmin = decoded.rol === 'admin';
  } catch (err) {
    console.error('Error decodificando token:', err);
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}
