
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children, exigirAdmin = false }) {

    const { usuario, autenticado, carregando } = useAuth();

    if (carregando) {
        return <p>Verificando autenticação...</p>;
    }

    if (!autenticado) {
        return <Navigate to="/login" replace />;
    }

    // Verificar permissão administrativa
    if (exigirAdmin && usuario?.role !== 'admin') {
        return <Navigate to="/biblioteca" replace />;
    }

    return children;
}

export default ProtectedRoute;
