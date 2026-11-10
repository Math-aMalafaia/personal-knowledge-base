import { createContext, useContext, useEffect, useState } from 'react';
import { buscarUsuarioLogado, logoutUsuario } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [autenticado, setAutenticado] = useState(false);
    const [carregando, setCarregando] = useState(true);

    async function verificarAutenticacao() {
        try {
            const dados = await buscarUsuarioLogado();

            if (dados.authenticated) {
                setUsuario(dados.usuario);
                setAutenticado(true);
            } else {
                setUsuario(null);
                setAutenticado(false);
            }
        } catch (error) {
            console.error('Erro ao verificar autenticação:', error);
            setUsuario(null);
            setAutenticado(false);
        } finally {
            setCarregando(false);
        }
    }

    async function logout() {
        await logoutUsuario();

        setUsuario(null);
        setAutenticado(false);
    }

    useEffect(() => {
        verificarAutenticacao();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                usuario,
                autenticado,
                carregando,
                logout,
                verificarAutenticacao
            }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}