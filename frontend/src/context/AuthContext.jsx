
import { createContext, useContext, useEffect, useRef, useState } from 'react';

import { buscarUsuarioLogado, logoutUsuario } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [autenticado, setAutenticado] = useState(false);
    const [carregando, setCarregando] = useState(true);

    const verificacaoAtual = useRef(0);

    async function verificarAutenticacao() {
        const identificador = ++verificacaoAtual.current;

        setCarregando(true);

        try {
            const dados = await buscarUsuarioLogado();


            if (identificador !== verificacaoAtual.current) {
                return false;
            }

            if (dados.authenticated) {
                setUsuario(dados.usuario);
                setAutenticado(true);
                return true;
            }

            setUsuario(null);
            setAutenticado(false);

            return false;

        } catch (error) {
            if (identificador === verificacaoAtual.current) {
                console.error('Erro ao verificar autenticação:', error);
                setUsuario(null);
                setAutenticado(false);
            }

            return false;

        } finally {
            if (identificador === verificacaoAtual.current) {
                setCarregando(false);
            }
        }
    }

    async function logout() {

        verificacaoAtual.current++;

        setCarregando(true);

        try {
            await logoutUsuario();

            setUsuario(null);
            setAutenticado(false);

        } finally {
            setCarregando(false);
        }
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
