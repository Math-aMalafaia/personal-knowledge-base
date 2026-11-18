import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { buscarPerfil, atualizarPerfil, alterarSenha } from '../services/api';

import { useAuth } from '../context/AuthContext';
import './Perfil.css';

function Perfil() {
    const navigate = useNavigate();
    const { verificarAutenticacao } = useAuth();

    const [perfil, setPerfil] = useState({ nome: '', email: ''});

    const [carregando, setCarregando] = useState(true);
    const [salvandoPerfil, setSalvandoPerfil] = useState(false);
    const [salvandoSenha, setSalvandoSenha] = useState(false);

    const [mensagemPerfil, setMensagemPerfil] = useState('');
    const [erroPerfil, setErroPerfil] = useState('');

    const [mensagemSenha, setMensagemSenha] = useState('');
    const [erroSenha, setErroSenha] = useState('');

    const [senhas, setSenhas] = useState({ senhaAtual: '', novaSenha: '', confirmarSenha: ''});

    useEffect(() => {
        async function carregarPerfil() {
            try {
                const dados = await buscarPerfil();

                setPerfil({
                    nome: dados.usuario.nome,
                    email: dados.usuario.email
                });
            } catch (error) {
                setErroPerfil(error.message);
            } finally {
                setCarregando(false);
            }
        }

        carregarPerfil();
    }, []);

    async function handleAtualizarPerfil(event) {
        event.preventDefault();

        setErroPerfil('');
        setMensagemPerfil('');
        setSalvandoPerfil(true);

        try {
            const dados = await atualizarPerfil(perfil);

            setPerfil({
                nome: dados.usuario.nome,
                email: dados.usuario.email
            });

            await verificarAutenticacao();

            setMensagemPerfil('Dados pessoais atualizados com sucesso!');
        } catch (error) {
            setErroPerfil(error.message);
        } finally {
            setSalvandoPerfil(false);
        }
    }

    function handleChangeSenha(event) {
        const { name, value } = event.target;

        setSenhas(prev => ({
            ...prev,
            [name]: value
        }));
    }

    async function handleAlterarSenha(event) {
        event.preventDefault();

        setErroSenha('');
        setMensagemSenha('');

        if (senhas.novaSenha !== senhas.confirmarSenha) {
            setErroSenha('A confirmação da senha não corresponde.');
            return;
        }

        if (senhas.novaSenha.length < 8) {
            setErroSenha('A nova senha deve possuir pelo menos 8 caracteres.');
            return;
        }

        setSalvandoSenha(true);

        try {
            const dados = await alterarSenha({
                senhaAtual: senhas.senhaAtual,
                novaSenha: senhas.novaSenha
            });

            setMensagemSenha(
                dados.message || 'Senha alterada com sucesso!'
            );

            setSenhas({
                senhaAtual: '',
                novaSenha: '',
                confirmarSenha: ''
            });
        } catch (error) {
            setErroSenha(error.message);
        } finally {
            setSalvandoSenha(false);
        }
    }

    if (carregando) {
        return <p className="perfil-carregando">Carregando perfil...</p>;
    }

    return (
        <main className="perfil-container">
            
            <header className="perfil-cabecalho">
                <div>
                    <h1>Meu perfil</h1>
                    <p>
                        Gerencie seus dados pessoais e a segurança da sua conta.
                    </p>
                </div>

                <button
                    type="button"
                    className="perfil-voltar"
                    onClick={() => navigate('/biblioteca')}
                >
                    Voltar para biblioteca
                </button>
            </header>


            <section className="perfil-card">
                <h2>Dados pessoais</h2>
                <p className="perfil-descricao">
                    Atualize suas informações de cadastro.
                </p>

                {erroPerfil && (
                    <p className="perfil-mensagem erro">{erroPerfil}</p>
                )}

                {mensagemPerfil && (
                    <p className="perfil-mensagem sucesso">
                        {mensagemPerfil}
                    </p>
                )}

                <form onSubmit={handleAtualizarPerfil}>
                    <div className="perfil-campo">
                        <label htmlFor="nome">Nome</label>
                        <input
                            id="nome"
                            type="text"
                            value={perfil.nome}
                            onChange={event =>
                                setPerfil({
                                    ...perfil,
                                    nome: event.target.value
                                })
                            }
                            required
                        />
                    </div>

                    <div className="perfil-campo">
                        <label htmlFor="email">E-mail</label>
                        <input
                            id="email"
                            type="email"
                            value={perfil.email}
                            onChange={event =>
                                setPerfil({
                                    ...perfil,
                                    email: event.target.value
                                })
                            }
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={salvandoPerfil}
                    >
                        {salvandoPerfil
                            ? 'Salvando...'
                            : 'Salvar alterações'}
                    </button>
                </form>
            </section>

            <section className="perfil-card">
                <h2>Segurança da conta</h2>
                <p className="perfil-descricao">
                    Altere sua senha para manter sua conta protegida.
                </p>

                {erroSenha && (
                    <p className="perfil-mensagem erro">{erroSenha}</p>
                )}

                {mensagemSenha && (
                    <p className="perfil-mensagem sucesso">
                        {mensagemSenha}
                    </p>
                )}

                <form onSubmit={handleAlterarSenha}>
                    <div className="perfil-campo">
                        <label htmlFor="senhaAtual">Senha atual</label>
                        <input
                            id="senhaAtual"
                            name="senhaAtual"
                            type="password"
                            value={senhas.senhaAtual}
                            onChange={handleChangeSenha}
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    <div className="perfil-campo">
                        <label htmlFor="novaSenha">Nova senha</label>
                        <input
                            id="novaSenha"
                            name="novaSenha"
                            type="password"
                            value={senhas.novaSenha}
                            onChange={handleChangeSenha}
                            autoComplete="new-password"
                            minLength={8}
                            required
                        />
                    </div>

                    <div className="perfil-campo">
                        <label htmlFor="confirmarSenha">
                            Confirmar nova senha
                        </label>
                        <input
                            id="confirmarSenha"
                            name="confirmarSenha"
                            type="password"
                            value={senhas.confirmarSenha}
                            onChange={handleChangeSenha}
                            autoComplete="new-password"
                            minLength={8}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={salvandoSenha}
                    >
                        {salvandoSenha
                            ? 'Alterando...'
                            : 'Alterar senha'}
                    </button>
                </form>
            </section>
        </main>
    );
}

export default Perfil;
