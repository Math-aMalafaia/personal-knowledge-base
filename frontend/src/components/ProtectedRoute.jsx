
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
    const { autenticado, carregando } = useAuth();

    if (carregando) {
        return <p>Verificando autenticação...</p>;
    }

    if (!autenticado) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;
