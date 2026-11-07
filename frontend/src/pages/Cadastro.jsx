
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { cadastrarUsuario } from '../services/api'
import './Cadastro.css'

function Cadastro() {
    const navigate = useNavigate()

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')

    const [erro, setErro] = useState('')
    const [sucesso, setSucesso] = useState('')
    const [carregando, setCarregando] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()

        setErro('')
        setSucesso('')

        if (senha !== confirmarSenha) {
            setErro('As senhas não coincidem.')
            return
        }

        try {
            setCarregando(true)

            const resultado = await cadastrarUsuario({
                nome,
                email,
                senha
            })

            setSucesso(
                resultado.message || 'Conta criada com sucesso!'
            )

            setNome('')
            setEmail('')
            setSenha('')
            setConfirmarSenha('')

        } catch (error) {
            setErro(error.message || 'Não foi possível realizar o cadastro.')
        } finally {
            setCarregando(false)
        }
    }

    return (
        <main className="cadastro-container">
            <section className="cadastro-card">

                <header className="cadastro-header">
                    <h1>A Grande Biblioteca</h1>
                    <p>Crie sua conta e organize sua jornada literária.</p>
                </header>

                <div className="cadastro-conteudo">
                    <h2>Criar minha conta</h2>
                    <p className="cadastro-descricao">
                        Preencha os campos abaixo para começar.
                    </p>

                    <form onSubmit={handleSubmit}>

                        <div className="cadastro-campo">
                            <label htmlFor="nome">Nome completo</label>
                            <input
                                id="nome"
                                type="text"
                                placeholder="Digite seu nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                            />
                        </div>

                        <div className="cadastro-campo">
                            <label htmlFor="email">E-mail</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="seuemail@exemplo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="cadastro-campo">
                            <label htmlFor="senha">Senha</label>
                            <input
                                id="senha"
                                type="password"
                                placeholder="Crie uma senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                            />
                        </div>

                        <div className="cadastro-campo">
                            <label htmlFor="confirmarSenha">
                                Confirmar senha
                            </label>
                            <input
                                id="confirmarSenha"
                                type="password"
                                placeholder="Digite a senha novamente"
                                value={confirmarSenha}
                                onChange={(e) => setConfirmarSenha(e.target.value)}
                                required
                            />
                        </div>

                        {erro && (
                            <p className="cadastro-mensagem erro">
                                {erro}
                            </p>
                        )}

                        {sucesso && (
                            <div className="cadastro-mensagem sucesso">
                                <p>{sucesso}</p>
                                <button
                                    type="button"
                                    onClick={() => navigate('/login')}
                                >
                                    Ir para o login
                                </button>
                            </div>
                        )}

                        <button
                            className="cadastro-botao"
                            type="submit"
                            disabled={carregando}
                        >
                            {carregando ? 'Criando conta...' : 'Criar minha conta'}
                        </button>

                    </form>

                    <p className="cadastro-login">
                        Já possui uma conta?{' '}
                        <Link to="/login">Faça login</Link>
                    </p>
                </div>

            </section>
        </main>
    )
}

export default Cadastro
